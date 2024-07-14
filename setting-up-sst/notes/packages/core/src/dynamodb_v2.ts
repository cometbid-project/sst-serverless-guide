import {
  DeleteCommandInput,
  DynamoDBDocument,
  GetCommandInput,
  PutCommandInput,
  QueryCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const client = DynamoDBDocument.from(new DynamoDB());

export default {
  get: (params: GetCommandInput) => client.get(params),
  put: (params: PutCommandInput) => client.put(params),
  query: (params: QueryCommandInput) => client.query(params),
  //upd: (params: UpdateCommandInput) => client.update(params),
  update: (params: any) => client.send(new UpdateCommand(params)),
  delete: (params: DeleteCommandInput) => client.delete(params),
};
