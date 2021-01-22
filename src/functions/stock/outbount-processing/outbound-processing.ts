import { DynamoDBStreamHandler } from 'aws-lambda'
import { DynamoDB } from '../../../libs'
import { transformObjectKeysToCamel } from '../../../helpers'
import { StockKeys, StockOutboundKeys } from '../../../types'
import { getStockBy, updateStockQuantityBy } from '../helpers'

export const stockOutboundProcessingHandler: DynamoDBStreamHandler = async (
  event
) => {
  event.Records.forEach(async (value) => {
    if (!value.dynamodb?.NewImage) {
      throw new Error('new image is undefined')
    }

    const inbound = transformObjectKeysToCamel(
      value.dynamodb?.NewImage
    ) as Record<StockOutboundKeys, DynamoDB.AttributeValue>

    const { stockId, outboundQuantity } = inbound

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
      Number(stockData.quantity.N) - Number(outboundQuantity.N)

    await updateStockQuantityBy(stockId.S, String(updatedStockQuantity))
  })
}
