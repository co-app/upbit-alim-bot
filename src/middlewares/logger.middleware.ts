import { APIGatewayProxyEvent } from 'aws-lambda'
import { Middleware, ProxyEvent } from '../utils/interface'

export const loggerMiddleware: () => Middleware<ProxyEvent> = () => {
  return (e: ProxyEvent, next) => {
    console.log('-------- logger middleware --------')

    return next(e)
  }
}
