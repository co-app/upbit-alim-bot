import { APIGatewayProxyEvent } from 'aws-lambda'
import { Middleware } from '../utils/interface'

export const loggerMiddleware: () => Middleware<APIGatewayProxyEvent> = () => {
  return (e: APIGatewayProxyEvent, next) => {
    console.log('-------- logger middleware --------')

    return next(e)
  }
}
