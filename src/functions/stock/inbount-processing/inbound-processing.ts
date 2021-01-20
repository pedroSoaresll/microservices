import { DynamoDB } from 'aws-sdk'

export const stockInboundProcessingHandler = async (
  event: DynamoDB.GetItemOutput
) => {
  console.log('caiu na trigger', event)
}
