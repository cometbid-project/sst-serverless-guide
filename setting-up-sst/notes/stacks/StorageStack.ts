import { Bucket, StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
  // Create an S3 Bucket
  const bucket = new Bucket(stack, "Uploads");

  // Create the DynamoDb table
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
  });

  return {
    bucket,
    table,
  };
}