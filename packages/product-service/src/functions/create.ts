import { APIGatewayProxyResultV2 } from 'aws-lambda'
import { snsClient } from '@microservices/shared'

export async function productCreateHandler(): Promise<APIGatewayProxyResultV2> {
  const snsList = await snsClient.listTopics().promise()

  console.log(snsList)

  const snsResponse = await snsClient
    .publish({
      Message: JSON.stringify({ hello: 'oi' }),
      TopicArn: 'arn:aws:sns:us-east-1:123456789012:product-created',
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify({ snsResponse }),
  }
}
