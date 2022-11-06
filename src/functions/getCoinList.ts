import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const result = JSON.parse(e.body || '')

    return {
      statusCode: 200,
      body: `hello world, ${result.name}`,
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: 'An Error Occured',
    }
  }
}
