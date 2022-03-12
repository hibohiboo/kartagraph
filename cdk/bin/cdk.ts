#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { AWSCarTaGraphClientStack } from '../lib/cdk-stack'
import * as dotenv from 'dotenv'

dotenv.config()
const envList = [
  'PROJECT_ID',
  'ROOT_DOMAIN',
  'DEPLOY_DOMAIN',
  'TAG_PROJECT_NAME',
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

new AWSCarTaGraphClientStack(app, `${projectId}-stack`, {
  bucketName: `${projectId}-s3-bucket`,
  identityName: `${projectId}-origin-access-identity-to-s3-bucket`,
  defaultCachePolicyName: `${projectId}-cache-policy-default`,
  imageCachePolicyName: `${projectId}-cache-policy-image`,
  functionName: `${projectId}-lambda-edge-ogp`,
  distributionName: `${projectId}-distribution-cloudfront`,
  rootDomain: processEnv.ROOT_DOMAIN,
  deployDomain: processEnv.DEPLOY_DOMAIN,
  projectNameTag: processEnv.TAG_PROJECT_NAME,
  env,
})
