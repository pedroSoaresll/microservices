import * as aws from 'aws-sdk'

aws.config.credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
}

export { default as dynamoClient } from './dynamodb'
export * from './dynamodb'
