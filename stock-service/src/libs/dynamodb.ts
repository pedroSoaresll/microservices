import { DynamoDB } from 'aws-sdk'
import { AWSStages } from '../types'

const options: DynamoDB.ClientConfiguration = {}

const stage: AWSStages = (process.env.STAGE as AWSStages) ?? 'dev'

if (stage === 'dev') {
  options.endpoint = 'http://localhost:8000'
} else if (stage === 'stg') {
  options.endpoint = 'dynamodb.us-east-1.amazonaws.com'
}

let dynamodb: DynamoDB

// @ts-ignore
if (!dynamodb) {
  dynamodb = new DynamoDB(options)
}

export default dynamodb
export { DynamoDB }
