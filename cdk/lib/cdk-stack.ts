import * as core from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cf from 'aws-cdk-lib/aws-cloudfront'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import { basePath } from '../constants/paths'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets'
import * as certManager from 'aws-cdk-lib/aws-certificatemanager'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

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
  restApiUrl: string
  apiKey: string
}

export class AWSCarTaGraphClientStack extends core.Stack {
  constructor(scope: Construct, id: string, props: Props) {
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
    const distribution = this.createCloudFront(bucket, identity, cert, props)
    // // 指定したディレクトリをデプロイ
    // this.deployS3(bucket, distribution, '../client/build', props.bucketName)

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
      autoDeleteObjects: true,
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
    props: {
      defaultCachePolicyName: string
      imageCachePolicyName: string
      distributionName: string
      deployDomain: string
      restApiUrl: string
      apiKey: string
    },
  ) {
    const {
      defaultCachePolicyName,
      imageCachePolicyName,
      distributionName,
      deployDomain,
      restApiUrl,
    } = props
    const defaultPolicyOption = {
      cachePolicyName: defaultCachePolicyName,
      comment: 'カルタグラフポリシー',
      // defaultTtl: core.Duration.days(2),
      // minTtl: core.Duration.seconds(0), // core.Duration.minutes(1),
      // maxTtl: core.Duration.days(365), // core.Duration.days(10),
      // cookieBehavior: cf.CacheCookieBehavior.all(),
      // headerBehavior: cf.CacheHeaderBehavior.none(),
      // queryStringBehavior: cf.CacheQueryStringBehavior.none(),
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
    const spaRoutingFunction = new cf.Function(this, 'SpaRoutingFunction', {
      functionName: 'SpaRoutingFunction',
      // 拡張子が含まれないURLはSPAファイルにリダイレクト
      code: cf.FunctionCode.fromInline(`
      function handler(event) {
        var request = event.request;
        if(request.uri.includes('.')){
          return request;
        }
        if(request.uri.startsWith('/cartagraph-editor')) {
          request.uri = '/cartagraph-editor/index.html';
        } else if(request.uri.startsWith('/cartagraph-gamebook')) {
          request.uri = '/cartagraph-gamebook/index.html';
        } else if (request.uri.startsWith('/cartagraph-solo-journal-editor')){
          request.uri = '/cartagraph-solo-journal-editor/index.html';
        } else if (request.uri.startsWith('/cartagraph-solo-journal/')){
          request.uri = '/cartagraph-solo-journal/index.html';
        } else if (request.uri.startsWith('/loop-city-trpg/')){
          request.uri = '/loop-city-trpg/index.html';
        } else if (request.uri.startsWith('/cartagraph-1hour-games/')){
          request.uri = '/cartagraph-1hour-games/index.html';
        } else if (request.uri.startsWith('/cartagraph-udonarium/')){
          request.uri = '/cartagraph-udonarium/udonarium/index.html';
        } else if (request.uri.startsWith('/cartagraph-udonarium-lily/')){
          request.uri = '/cartagraph-udonarium-lily/udonarium_lily/index.html';
        } else if (request.uri.startsWith('/cartagraph-udonarium-with-fly/')){
          request.uri = '/cartagraph-udonarium-with-fly/udonarium/index.html';
        } else if (request.uri.startsWith('/sosaku-mura')){
          request.uri = '/sosaku-mura/index.html';
        } else if (request.uri.startsWith('/friends-sold-separately')){
          request.uri = '/friends-sold-separately/index.html';
        } else if (request.uri.startsWith('/friends-shakehand')){
          request.uri = '/friends-shakehand/index.html';
        } else if (request.uri.startsWith('/rooper-udonarium')){
          request.uri = '/rooper-udonarium/udonarium/index.html';
        } else {
          request.uri = '/cartagraph/index.html';
        } 
        return request;
      }
      `),
    })
    core.Tags.of(spaRoutingFunction).add('Service', 'Cloud Front Function')
    const apiEndPointUrlWithoutProtocol = core.Fn.select(
      1,
      core.Fn.split('://', restApiUrl),
    )
    const apiEndPointDomainName = core.Fn.select(
      0,
      core.Fn.split('/', apiEndPointUrlWithoutProtocol),
    )
    const lambdaEdge = this.createLambdaEdge()
    const d = new cf.Distribution(this, distributionName, {
      // enableIpV6: true,
      // httpVersion: cf.HttpVersion.HTTP2,
      comment: '電子ゲームブック カルタグラフ',
      defaultRootObject: '/index.html',

      priceClass: cf.PriceClass.PRICE_CLASS_200,
      defaultBehavior: {
        origin,
        // allowedMethods: cf.AllowedMethods.ALLOW_GET_HEAD,
        // cachedMethods: cf.CachedMethods.CACHE_GET_HEAD,
        cachePolicy: myCachePolicy,
        viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            eventType: cf.FunctionEventType.VIEWER_REQUEST,
            function: spaRoutingFunction,
          },
        ],
      },
      additionalBehaviors: {
        'v1/*': {
          origin: new origins.HttpOrigin(apiEndPointDomainName, {
            // originPath: `/v1`,
            customHeaders: {
              'x-api-key': props.apiKey,
            },
          }),
          allowedMethods: cf.AllowedMethods.ALLOW_ALL,
          viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: new cf.CachePolicy(
            this,
            `${distributionName}-rest-api-cache-policy`,
            {
              cachePolicyName: `${distributionName}-rest-api-cache-policy`,
              comment: 'CloudFront + ApiGateway用ポリシー',
              defaultTtl: core.Duration.seconds(0),
              maxTtl: core.Duration.seconds(10),
              // minTtl: core.Duration.seconds(0),
              headerBehavior: cf.CacheHeaderBehavior.allowList(
                'x-api-key',
                'content-type',
              ),
            },
          ),
        },
        'data/*': {
          origin,
          allowedMethods: cf.AllowedMethods.ALLOW_ALL,
          viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: new cf.CachePolicy(
            this,
            `${distributionName}-data-cache-policy`,
            {
              cachePolicyName: `${distributionName}-data-cache-cache-policy`,
              comment: 'CloudFront データ部用ポリシー',
              defaultTtl: core.Duration.seconds(0),
              maxTtl: core.Duration.seconds(10),
              // minTtl: core.Duration.seconds(0),
              headerBehavior: cf.CacheHeaderBehavior.allowList('content-type'),
            },
          ),
        },
        'friends-shakehand/gallery/*': {
          origin,
          viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          edgeLambdas: [
            {
              eventType: cf.LambdaEdgeEventType.VIEWER_REQUEST,
              functionVersion: lambdaEdge.currentVersion,
              includeBody: true,
            },
          ],
        },
      },

      // errorResponses: [
      //   {
      //     httpStatus: 404,
      //     responseHttpStatus: 200,
      //     responsePagePath: '/cartagraph/index.html',
      //     ttl: core.Duration.seconds(0),
      //   },
      //   {
      //     httpStatus: 403,
      //     responseHttpStatus: 200,
      //     responsePagePath: '/index.html',
      //     ttl: core.Duration.seconds(0),
      //   },
      // ],
      // 2021.09.05 GUIコンソール上の推奨とCDKのデフォルト値がずれていたので明示
      minimumProtocolVersion: cf.SecurityPolicyProtocol.TLS_V1_2_2021,
      // Route53と連携するためのカスタムドメイン
      certificate: cert,
      domainNames: [deployDomain],
    })
    core.Tags.of(d).add('Service', 'Cloud Front')

    return d
  }

  // private deployS3(
  //   siteBucket: s3.Bucket,
  //   distribution: cf.Distribution,
  //   sourcePath: string,
  //   bucketName: string,
  // ) {
  //   // Deploy site contents to S3 bucket
  //   new s3deploy.BucketDeployment(
  //     this,
  //     `${bucketName}-deploy-with-invalidation`,
  //     {
  //       sources: [s3deploy.Source.asset(sourcePath)],
  //       destinationBucket: siteBucket,
  //       distribution,
  //       distributionPaths: ['/*'],
  //       destinationKeyPrefix: basePath,
  //     },
  //   )
  // }

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

  private createLambdaEdge() {
    const f = new cf.experimental.EdgeFunction(this, 'cdk-lambda-edge', {
      code: lambda.Code.fromAsset('dist/ogp'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_18_X,
    })
    core.Tags.of(f).add('Service', 'Lambda@Edge')
    return f
  }
}
