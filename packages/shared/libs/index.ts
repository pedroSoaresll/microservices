import * as aws from 'aws-sdk'

import { AWSStages } from '../types'

const stage: AWSStages = (process.env.STAGE as AWSStages) ?? 'dev'

if (stage !== 'prod') {
  aws.config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  }
}

export { default as dynamoClient } from './dynamodb'
export * from './dynamodb'
