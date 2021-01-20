import { APIGatewayEvent, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import { v4 as uuid } from 'uuid'

// Libs
import { dynamoClient, DynamoDB } from '../../libs'

// Types
import { DynamoDBTables, Stock } from '../../types'

// Validator
import { transformObjectKeysToCamel } from '../../helpers'
import { stockCreateValidator } from './validator'

export const stockCreateHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    const { body } = event

    if (!body) {
      throw new Error('payload is empty')
    }

    const data = JSON.parse(body) as Stock

    await stockCreateValidator(body)

    const {
      cost,
      expanses,
      externalId,
      provider,
      quantity,
      quantityMin,
      unitSalePrice,
    } = transformObjectKeysToCamel(data)

    const TableName: DynamoDBTables = 'stockTable'
    const params: DynamoDB.PutItemInput = {
      TableName,
      Item: {
        id: {
          S: uuid(),
        },
        external_id: {
          S: String(externalId),
        },
        quantity: {
          N: String(quantity),
        },
        cost: {
          N: String(cost),
        },
        quantity_min: {
          N: String(quantityMin),
        },
        unit_sale_price: {
          N: String(unitSalePrice),
        },
        expanses: {
          N: String(expanses),
        },
        provider: {
          S: provider ?? '',
        },
      },
    }

    const result = await dynamoClient.putItem(params).promise()
    const { $response: response } = result

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
