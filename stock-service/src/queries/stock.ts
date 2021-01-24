import { DynamoDB } from 'aws-sdk'
import { DynamoDBTables } from '../types'

export function queryGetStockBy(id: string) {
  const TableName: DynamoDBTables = 'stockTable'
  return {
    TableName,
    Key: {
      id: {
        S: id,
      },
    },
  } as DynamoDB.GetItemInput
}

export function queryUpdateStockQuantityBy(id: string, newQuantity: string) {
  const TableName: DynamoDBTables = 'stockTable'
  return {
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
  } as DynamoDB.UpdateItemInput
}
