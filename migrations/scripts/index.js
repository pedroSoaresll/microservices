const { default: dynamodb } = require('../../src/libs/dynamodb')

dynamodb.getItem(
  {
    TableName: 'stockTable',
    Key: {
      id: {
        S: '292787c6-29bb-4f51-a529-7907fa0c0d9b',
      },
    },
  },
  (err, data) => {
    console.log(data)
  }
)

dynamodb.scan(
  {
    TableName: 'stockInboundEvents',
    Key: {
      stock_id: {
        S: '292787c6-29bb-4f51-a529-7907fa0c0d9b',
      },
    },
  },
  (err, data) => {
    console.log(data)
  }
)
