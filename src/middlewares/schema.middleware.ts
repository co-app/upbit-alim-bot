import { ObjectSchema } from 'joi'
import { Middleware, ProxyEvent } from '../utils/interface'

export const schemaMiddleware: <T extends ProxyEvent>(schema: ObjectSchema) => Middleware<T> = (
  schema: ObjectSchema
) => {
  return (e, next) => {
    const validation = schema.validate(e._body)

    if (validation.error) {
      throw new Error(JSON.stringify(validation.error))
    }

    return next(e)
  }
}
