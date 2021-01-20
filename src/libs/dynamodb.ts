import { DynamoDB } from 'aws-sdk'
import { AWSStages } from '../types'

let endpoint: string

const stage: AWSStages = (process.env.STAGE as AWSStages) ?? 'dev'

if (stage === 'dev') {
  endpoint = 'http://localhost:8000'
} else if (stage === 'stg') {
  endpoint = 'dynamodb.us-east-1.amazonaws.com'
} else {
  endpoint = ''
}

let dynamodb: DynamoDB

// @ts-ignore
if (!dynamodb) {
  dynamodb = new DynamoDB({
    endpoint,
  })
}

export default dynamodb
export { DynamoDB }
