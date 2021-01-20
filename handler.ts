import { DynamoDB } from 'aws-sdk'
import * as dynamodb from 'serverless-dynamodb-client'

const client = dynamodb.doc

export const hello = async () => {
  const params: DynamoDB.GetItemInput = {
    TableName: 'stockTable',
    Key: {
      id: {
        S: '123123',
      },
    },
  }

  const result = await client.get(params)
  const { data } = result.response

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
