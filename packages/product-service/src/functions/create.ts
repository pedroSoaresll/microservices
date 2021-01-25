import { APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda'
import { snsClient } from '@microservices/shared'

export async function productCreateHandler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResultV2> {
  const snsResponse = await snsClient
    .publish({
      Message: 'hello!',
      MessageStructure: 'json',
      TopicArn: 'product-created',
    })
    .promise()

  console.log(snsResponse)

  return {
    statusCode: 200,
    body: JSON.stringify({ event }),
  }
}
