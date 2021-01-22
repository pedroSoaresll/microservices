import { dynamoClient, DynamoDB } from '../../../libs'
import { DynamoDBTables } from '../../../types'

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
