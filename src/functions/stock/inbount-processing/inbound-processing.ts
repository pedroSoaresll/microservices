import { DynamoDBStreamHandler } from 'aws-lambda'
import { DynamoDB, dynamoClient } from '../../../libs'
import { transformObjectKeysToCamel } from '../../../helpers'
import { StockInboundKeys, DynamoDBTables, StockKeys } from '../../../types'

export async function getStockBy(id: string) {
  const TableName: DynamoDBTables = 'stockTable'
  const params: DynamoDB.GetItemInput = {
    TableName,
    Key: {
      id: {
        S: id,
      },
    },
  }

  return dynamoClient.getItem(params).promise()
}

export async function updateStockQuantityBy(id: string, newQuantity: string) {
  const TableName: DynamoDBTables = 'stockTable'
  const params: DynamoDB.UpdateItemInput = {
    TableName,
    Key: {
      id: {
        S: id,
      },
    },
    UpdateExpression: 'set quantity = :q',
    ExpressionAttributeValues: {
      ':q': {
        N: newQuantity,
      },
    },
  }

  return dynamoClient.updateItem(params).promise()
}

export const stockInboundProcessingHandler: DynamoDBStreamHandler = async (
  event
) => {
  event.Records.forEach(async (value) => {
    if (!value.dynamodb?.NewImage) {
      throw new Error('new image is undefined')
    }

    const inbound = transformObjectKeysToCamel(
      value.dynamodb?.NewImage
    ) as Record<StockInboundKeys, DynamoDB.AttributeValue>

    const { stockId, inboundQuantity } = inbound

    if (!stockId.S) {
      throw new Error('stock id is undefined')
    }

    const { $response: stockResponse } = await getStockBy(stockId.S)
    const { data: stock } = stockResponse

    if (!stock || !stock.Item) {
      throw new Error('stock not found')
    }

    const stockData = transformObjectKeysToCamel(stock.Item) as Record<
      StockKeys,
      DynamoDB.AttributeValue
    >

    const updatedStockQuantity =
      Number(stockData.quantity.N) + Number(inboundQuantity.N)

    await updateStockQuantityBy(stockId.S, String(updatedStockQuantity))
  })
}
