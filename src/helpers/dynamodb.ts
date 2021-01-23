import { DynamoDB } from 'aws-sdk'
import { dynamoClient } from '../libs'

export function getItems(params: DynamoDB.GetItemInput) {
  return dynamoClient.getItem(params).promise()
}

export function updateItems(params: DynamoDB.UpdateItemInput) {
  return dynamoClient.updateItem(params).promise()
}
