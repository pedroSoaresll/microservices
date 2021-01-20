import { APIGatewayEvent, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import { v4 as uuid } from 'uuid'

// Libs
import { DynamoDB, dynamoClient } from '../../../libs'

// Helpers
import { transformObjectKeysToCamel } from '../../../helpers'

// Types
import { StockInboundPayload } from './types'
import { DynamoDBTables } from '../../../types'

import { stockInboundValidator } from './validator'

export const stockInboundHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    const { body } = event

    if (!body) {
      throw new Error('payload is empty')
    }

    const data = JSON.parse(body) as StockInboundPayload

    await stockInboundValidator(data)

    const { inboundQuantity, stockId, eventAt } = transformObjectKeysToCamel(
      data
    )

    const TableName: DynamoDBTables = 'stockInboundEvents'
    const params: DynamoDB.PutItemInput = {
      TableName,
      Item: {
        id: {
          S: uuid(),
        },
        stock_id: {
          S: stockId,
        },
        inbound_quantity: {
          N: String(inboundQuantity),
        },
        event_at: {
          S: eventAt ?? new Date().toISOString(),
        },
      },
    }
    const { $response: response } = await dynamoClient.putItem(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message,
      }),
    }
  }
}