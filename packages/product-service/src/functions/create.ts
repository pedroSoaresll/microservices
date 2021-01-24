import { APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda'
import { SNS } from 'aws-sdk'

const sns = new SNS({})

export function productCreateHandler(
  event: APIGatewayEvent
): APIGatewayProxyResultV2 {
  console.log(event.body)
  return {
    statusCode: 200,
    body: JSON.stringify({ event }),
  }
}
