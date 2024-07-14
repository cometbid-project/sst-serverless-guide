import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDbV2 from "@notes/core/dynamodb_v2";
import { APIGatewayProxyEvent } from "aws-lambda";

export const main = handler(async (event: APIGatewayProxyEvent) => {
  const params = {
    TableName: Table.Notes.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId', only return items with matching 'userId'
    // partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - 'userId', defines the 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":userId": "123", // The id of the author
    },
  };

  const result = await dynamoDbV2.query(params);

  // Return the matching list items in response body
  return JSON.stringify(result.Items);
});
