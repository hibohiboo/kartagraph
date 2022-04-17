#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { AWSCarTaGraphClientStack } from '../lib/cdk-stack'
import * as dotenv from 'dotenv'
import { AWSCarTaGraphClientDeployStack } from '../lib/client-deploy-stack'

dotenv.config()
const envList = [
  'PROJECT_ID',
  'ROOT_DOMAIN',
  'DEPLOY_DOMAIN',
  'TAG_PROJECT_NAME',
  'REST_API_URL',
  'X_API_KEY',
  'DISTRIBUTION_ID',
  'DOMAIN_NAME',
] as const
for (const key of envList) {
  if (!process.env[key]) throw new Error(`please add ${key} to .env`)
}
const processEnv = process.env as Record<typeof envList[number], string>

const app = new cdk.App()
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
}
const projectId = processEnv.PROJECT_ID
const bucketName = `${projectId}-s3-bucket`
new AWSCarTaGraphClientStack(app, `${projectId}-stack`, {
  bucketName,
  identityName: `${projectId}-origin-access-identity-to-s3-bucket`,
  defaultCachePolicyName: `${projectId}-cache-policy-default`,
  imageCachePolicyName: `${projectId}-cache-policy-image`,
  functionName: `${projectId}-lambda-edge-ogp`,
  distributionName: `${projectId}-distribution-cloudfront`,
  rootDomain: processEnv.ROOT_DOMAIN,
  deployDomain: processEnv.DEPLOY_DOMAIN,
  projectNameTag: processEnv.TAG_PROJECT_NAME,
  restApiUrl: processEnv.REST_API_URL,
  apiKey: processEnv.X_API_KEY,
  env,
})

new AWSCarTaGraphClientDeployStack(app, `${projectId}-deploy-stack`, {
  bucketName,
  distributionId: processEnv.DISTRIBUTION_ID,
  domainName: processEnv.DOMAIN_NAME,
  projectNameTag: processEnv.TAG_PROJECT_NAME,
  projectId,
  env,
})
