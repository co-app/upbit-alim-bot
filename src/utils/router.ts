import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Middleware } from './interface'

const withMiddleware =
  <T>(middlewares: Middleware<T>[], handler) =>
  (e: T) => {
    const chain = ([first, ...rest]: Middleware<T>[]) => {
      if (first) {
        return (e: T): Promise<any> => {
          try {
            return first(e, chain(rest))
          } catch (e) {
            return Promise.reject(e)
          }
        }
      }

      return handler
    }
    return chain(middlewares)(e)
  }

export const router = <T, R>(middlewares: Middleware<T>[], handler: R) => withMiddleware(middlewares, handler)
