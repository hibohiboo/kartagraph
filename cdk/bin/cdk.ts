#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { AWSCarTaGraphClientStack } from '../lib/cdk-stack'
import * as dotenv from 'dotenv'

// typescriptで予測が効かずにundefinedがとれない
// ;(() =>
//   ['PROJECT_ID', 'ROOT_DOMAIN', 'DEPLOY_DOMAIN'].forEach((key) => {
//     if (!process.env[key]) throw new Error(`please add ${key} to .env`)
//   }))()
dotenv.config()
if (!process.env.PROJECT_ID) throw new Error(`please add PROJECT_ID to .env`)
if (!process.env.ROOT_DOMAIN) throw new Error(`please add ROOT_DOMAIN to .env`)
if (!process.env.DEPLOY_DOMAIN)
  throw new Error(`please add DEPLOY_DOMAIN to .env`)
if (!process.env.TAG_PROJECT_NAME)
  throw new Error(`please add TAG_PROJECT_NAME to .env`)

const app = new cdk.App()
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
}
const projectId = process.env.PROJECT_ID

new AWSCarTaGraphClientStack(app, `${projectId}-stack`, {
  bucketName: `${projectId}-s3-bucket`,
  identityName: `${projectId}-origin-access-identity-to-s3-bucket`,
  defaultCachePolicyName: `${projectId}-cache-policy-default`,
  imageCachePolicyName: `${projectId}-cache-policy-image`,
  functionName: `${projectId}-lambda-edge-ogp`,
  distributionName: `${projectId}-distribution-cloudfront`,
  rootDomain: process.env.ROOT_DOMAIN,
  deployDomain: process.env.DEPLOY_DOMAIN,
  projectNameTag: process.env.TAG_PROJECT_NAME,
  env,
})
