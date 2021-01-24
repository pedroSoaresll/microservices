import { APIGatewayEvent } from 'aws-lambda'

export function productCreateHandler(event: APIGatewayEvent) {
  console.log(event)
}
