import * as AWSLambda from "aws-lambda";

export default async function exampleHandler(
  event: AWSLambda.APIGatewayProxyEvent,
  context: AWSLambda.Context
): Promise<AWSLambda.APIGatewayProxyStructuredResultV2> {
  return {
    statusCode: 200,
    body: JSON.stringify({ event, context }),
  };
}
