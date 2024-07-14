import { Context, APIGatewayProxyEvent } from "aws-lambda";

type Request = {
  method: string;
  path: string;
  protocol: string;
  sourceIp: string;
  userAgent: string;
};

type RequestContext = {
  http?: Request;
  requestId?: string;
  routeKey?: string;
};

export default function handler(
  lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>
) {
  return async function (event: APIGatewayProxyEvent, context: Context) {
    let body, statusCode;

    try {
      // Run the Lambda
      body = await lambda(event, context);
      const req: RequestContext = event.requestContext;

      console.log("Http Method ", req?.http?.method);

      statusCode = 200;
      if (req?.http?.method == "POST")
        statusCode = 201;

      console.log("Status Code: ", statusCode);

    } catch (error) {
      statusCode = 500;
      body = JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      });
    }

    // Return HTTP response
    return {
      body,
      statusCode,
    };
  };
}
