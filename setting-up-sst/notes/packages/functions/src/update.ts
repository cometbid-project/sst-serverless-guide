import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDbV2 from "@notes/core/dynamodb_v2";
import { APIGatewayProxyEvent } from "aws-lambda";

export const main = handler(async (event: APIGatewayProxyEvent) => {
  let data = JSON.parse(event.body || "{}");

  const params = {
    TableName: Table.Notes.tableName,
    Key: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
      noteId: event?.pathParameters?.id, // The id of the note from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributevalues' defines the value in the update expression
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamoDbV2.update(params);

  // Return the matching list items in response body
  return JSON.stringify({ success: true });
});
