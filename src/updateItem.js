"use strict";

const AWS = require("aws-sdk")

const updateItem = async (event) => {

  const {itemStatus} = JSON.parse(event.body);
  const {id} = event.pathParameters

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  await dynamodb.update({
    TableName: "iem",
    Key: {id},
    UpdateExpression: 'set itemStatus = :itemStatus',
    ExpressionAttributeValues: {
      ':itemStatus': itemStatus
    },
    ReturnValues: "ALL_NEW"
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      { msg: 'Item Atualizado'}
    ),
  };
};


module.exports = {
    handler:updateItem
}


