import * as uuid from "uuid";
import handler from "@notes/core/handler";
//import dynamoDb from "@notes/core/dynamodb";
import dynamoDbV2 from "@notes/core/dynamodb_v2";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Table } from "sst/node/table";

export const main = handler(async (event: APIGatewayProxyEvent) => {
  let data = {
    content: "",
    attachment: "",
  };

  if (event.body != null) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
      noteId: uuid.v1(), // A unique  uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDbV2.put(params);

  return JSON.stringify(params.Item);
});
