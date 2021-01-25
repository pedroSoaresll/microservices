import { SNS } from 'aws-sdk'
import { AWSStages } from '../types'

const options: SNS.ClientConfiguration = {}

const stage: AWSStages = (process.env.STAGE as AWSStages) ?? 'dev'

if (stage === 'dev') {
  options.endpoint = 'http://localhost:6000'
} else if (stage === 'stg') {
  options.endpoint = 'dynamodb.us-east-1.amazonaws.com'
}

let snsInstance: SNS

// @ts-ignore
if (!snsInstance) {
  snsInstance = new SNS(options)
}

export default snsInstance
export { SNS }
