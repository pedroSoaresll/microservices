import { APIGatewayEvent, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import { v4 as uuid } from 'uuid'

// Libs
import {
  DynamoDB,
  dynamoClient,
  transformObjectKeysToCamel,
  DynamoDBTables,
  StockEventStatus,
} from '@microservices/shared'

// Types
import { StockOutboundPayload } from './types'

import { stockOutboundValidator } from './validator'

export const stockOutboundHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    const { body, pathParameters } = event

    // @todo: do a validation to know if stockId really exists
    const stockId = pathParameters?.stockId

    if (!body) {
      throw new Error('payload is empty')
    }

    const data = JSON.parse(body) as StockOutboundPayload

    await stockOutboundValidator(data)

    const { outboundQuantity, eventAt } = transformObjectKeysToCamel(data)

    const stockEventStatus: StockEventStatus = 'PENDING'
    const TableName: DynamoDBTables = 'stockOutboundEvents'
    const params: DynamoDB.PutItemInput = {
      TableName,
      Item: {
        id: {
          S: uuid(),
        },
        stock_id: {
          S: stockId,
        },
        outbound_quantity: {
          N: String(outboundQuantity),
        },
        event_at: {
          S: eventAt ?? new Date().toISOString(),
        },
        status: {
          S: stockEventStatus,
        },
      },
    }

    const { $response: response } = await dynamoClient.putItem(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message,
      }),
    }
  }
}
