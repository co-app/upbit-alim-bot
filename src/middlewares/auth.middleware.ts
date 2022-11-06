import { APIGatewayProxyEvent } from 'aws-lambda'
import { Middleware } from '../utils/interface'

export const authMiddleware: <T extends APIGatewayProxyEvent>() => Middleware<T> = () => {
  return (e, next) => {
    console.log(e.headers)

    return next(e)
  }
}
