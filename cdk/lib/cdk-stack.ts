import * as core from '@aws-cdk/core'
import * as s3 from '@aws-cdk/aws-s3'
import * as cf from '@aws-cdk/aws-cloudfront'
import * as iam from '@aws-cdk/aws-iam'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'
import { basePath } from '../constants/paths'
import * as lambda from '@aws-cdk/aws-lambda'
import * as origins from '@aws-cdk/aws-cloudfront-origins'
import * as route53 from '@aws-cdk/aws-route53'
import * as route53Targets from '@aws-cdk/aws-route53-targets'
import * as certManager from '@aws-cdk/aws-certificatemanager'

interface Props extends core.StackProps {
  bucketName: string
  identityName: string
  defaultCachePolicyName: string
  imageCachePolicyName: string
  functionName: string
  distributionName: string
  rootDomain: string
  deployDomain: string
  projectNameTag: string
}

export class AWSCarTaGraphClientStack extends core.Stack {
  constructor(scope: core.Construct, id: string, props: Props) {
    super(scope, id, props)
    // CloudFront オリジン用のS3バケットを作成
    const bucket = this.createS3(props.bucketName)
    // CloudFront で設定する オリジンアクセスアイデンティティ を作成
    const identity = this.createIdentity(bucket, props.identityName)
    // S3バケットポリシーで、CloudFrontのオリジンアクセスアイデンティティを許可
    this.createPolicy(bucket, identity)

    const zone = this.findRoute53HostedZone(props.rootDomain)
    const cert = this.createTLSCertificate(props.deployDomain, zone)
    // CloudFrontディストリビューションを作成
    const distribution = this.createCloudFront(
      bucket,
      identity,
      cert,
      props.defaultCachePolicyName,
      props.imageCachePolicyName,
      props.distributionName,
      props.deployDomain,
    )
    // 指定したディレクトリをデプロイ
    this.deployS3(bucket, distribution, '../client/build', props.bucketName)

    // route53 の CloudFrontに紐づくレコード作成
    this.addRoute53Records(zone, props.deployDomain, distribution)

    // 確認用にCloudFrontのURLに整形して出力
    new core.CfnOutput(this, `${props.distributionName}-top-url`, {
      value: `https://${distribution.distributionDomainName}/`,
    })

    core.Tags.of(this).add('Project', props.projectNameTag)
  }

  private createS3(bucketName: string) {
    const bucket = new s3.Bucket(this, bucketName, {
      bucketName,
      accessControl: s3.BucketAccessControl.PRIVATE,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: core.RemovalPolicy.DESTROY,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        },
      ],
    })
    return bucket
  }

  private createIdentity(bucket: s3.Bucket, identityName: string) {
    const identity = new cf.OriginAccessIdentity(this, identityName, {
      comment: `${bucket.bucketName} access identity`,
    })
    return identity
  }

  private createPolicy(bucket: s3.Bucket, identity: cf.OriginAccessIdentity) {
    const myBucketPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:GetObject', 's3:ListBucket'],
      principals: [
        new iam.CanonicalUserPrincipal(
          identity.cloudFrontOriginAccessIdentityS3CanonicalUserId,
        ),
      ],
      resources: [bucket.bucketArn + '/*', bucket.bucketArn],
    })
    bucket.addToResourcePolicy(myBucketPolicy)
  }

  private createCloudFront(
    bucket: s3.Bucket,
    identity: cf.OriginAccessIdentity,
    cert: certManager.DnsValidatedCertificate,
    defaultCachePolicyName: string,
    imageCachePolicyName: string,
    distributionName: string,
    deployDomain: string,
  ) {
    const defaultPolicyOption = {
      cachePolicyName: defaultCachePolicyName,
      comment: 'A default policy',
      defaultTtl: core.Duration.days(2),
      minTtl: core.Duration.seconds(0), // core.Duration.minutes(1),
      maxTtl: core.Duration.days(365), // core.Duration.days(10),
      cookieBehavior: cf.CacheCookieBehavior.all(),
      headerBehavior: cf.CacheHeaderBehavior.none(),
      queryStringBehavior: cf.CacheQueryStringBehavior.none(),
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    }
    const myCachePolicy = new cf.CachePolicy(
      this,
      defaultCachePolicyName,
      defaultPolicyOption,
    )
    const imgCachePolicy = new cf.CachePolicy(this, imageCachePolicyName, {
      headerBehavior: cf.CacheHeaderBehavior.allowList(
        'Access-Control-Request-Headers',
        'Access-Control-Request-Method',
        'Origin',
      ),
    })
    const origin = new origins.S3Origin(bucket, {
      originAccessIdentity: identity,
    })

    const d = new cf.Distribution(this, distributionName, {
      // enableIpV6: true,
      // httpVersion: cf.HttpVersion.HTTP2,
      comment: '電子ゲームブック カルタグラフ',
      defaultRootObject: '/index.html',

      priceClass: cf.PriceClass.PRICE_CLASS_200,
      defaultBehavior: {
        origin,
        allowedMethods: cf.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cf.CachedMethods.CACHE_GET_HEAD,
        cachePolicy: myCachePolicy,
        viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/cartagraph/index.html',
          ttl: core.Duration.seconds(0),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: core.Duration.seconds(0),
        },
      ],
      // 2021.09.05 GUIコンソール上の推奨とCDKのデフォルト値がずれていたので明示
      minimumProtocolVersion: cf.SecurityPolicyProtocol.TLS_V1_2_2021,
      // Route53と連携するためのカスタムドメイン
      certificate: cert,
      domainNames: [deployDomain],
    })
    core.Tags.of(d).add('Service', 'Cloud Front')

    return d
  }

  private deployS3(
    siteBucket: s3.Bucket,
    distribution: cf.Distribution,
    sourcePath: string,
    bucketName: string,
  ) {
    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(
      this,
      `${bucketName}-deploy-with-invalidation`,
      {
        sources: [s3deploy.Source.asset(sourcePath)],
        destinationBucket: siteBucket,
        distribution,
        distributionPaths: ['/*'],
        destinationKeyPrefix: basePath,
      },
    )
  }

  private findRoute53HostedZone(rootDomain: string) {
    return route53.HostedZone.fromLookup(this, `${rootDomain}-hosted-zone`, {
      domainName: rootDomain,
    })
  }

  private createTLSCertificate(
    deployDomain: string,
    hostedZone: route53.IHostedZone,
  ) {
    return new certManager.DnsValidatedCertificate(
      this,
      `${deployDomain}-certificate`,
      {
        domainName: deployDomain,
        hostedZone, // DNS 認証に Route 53 のホストゾーンを使う
        region: 'us-east-1', // 必ず us-east-1 リージョン
        validation: certManager.CertificateValidation.fromDns(),
      },
    )
  }

  private addRoute53Records(
    zone: route53.IHostedZone,
    deployDomain: string,
    cf: cf.Distribution,
  ) {
    const propsForRoute53Records = {
      zone,
      recordName: deployDomain,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(cf),
      ),
    }
    new route53.ARecord(this, 'ARecord', propsForRoute53Records)
    new route53.AaaaRecord(this, 'AaaaRecord', propsForRoute53Records)
  }
}
