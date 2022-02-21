import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Context,
} from "aws-lambda";

interface LambdaEvent extends Omit<APIGatewayProxyEventV2, "pathParameters"> {
  pathParameters: { foo?: string };
}

interface LambdaResult extends Omit<APIGatewayProxyStructuredResultV2, "body"> {
  body: Stringified<{
    foo: string | undefined;
    event: LambdaEvent;
    context: Context;
  }>;
}

export const handler: Handler<LambdaEvent, LambdaResult> = async (
  event,
  context
): Promise<LambdaResult> => {
  const { foo } = event.pathParameters;

  return {
    body: JSON.stringify({ foo, event, context }),
  };
};

export default handler;
