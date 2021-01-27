import { APIGatewayProxyResultV2 } from 'aws-lambda'
import { snsClient } from '@microservices/shared'

const { AWS_ACCOUNT_ID } = process.env

export async function productCreateHandler(): Promise<APIGatewayProxyResultV2> {
  const snsList = await snsClient.listTopics().promise()

  console.log(snsList)

  const snsResponse = await snsClient
    .publish({
      Message: JSON.stringify({ hello: 'oi' }),
      TopicArn: `arn:aws:sns:us-east-1:${AWS_ACCOUNT_ID}:product-created`,
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify({ snsResponse }),
  }
}
