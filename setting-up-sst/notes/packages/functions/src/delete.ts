import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDbV2 from "@notes/core/dynamodb_v2";
import { APIGatewayProxyEvent } from "aws-lambda";

export const main = handler(async (event: APIGatewayProxyEvent) => {
  const params = {
    TableName: Table.Notes.tableName,
    // 'Key' defines the partition key and sort key of
    // item to be retrieved.
    Key: {
      userId: "123", // The id of the author
      noteId: event?.pathParameters?.id, // The id of the note from the path
    },
  };

  await dynamoDbV2.delete(params);

  return JSON.stringify({ success: true });
});
