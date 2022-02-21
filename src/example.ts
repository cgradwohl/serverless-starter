import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
} from "aws-lambda";

interface LambdaEvent extends Omit<APIGatewayProxyEventV2, "pathParameters"> {
  pathParameters: { productId?: string; userId: string };
}

interface LambdaResult extends Omit<APIGatewayProxyStructuredResultV2, "body"> {
  products: any;
}

export const handler: Handler<LambdaEvent, LambdaResult> = async (
  event,
  context
): Promise<LambdaResult> => {
  const { productId, userId } = event.pathParameters;

  return {
    statusCode: 200,
    products: JSON.stringify({ productId, userId, event, context }),
  };
};

export default handler;
