import { APIGatewayProxyResult } from 'aws-lambda'

enum TryType {
  PASS = 'pass',
  FAIL = 'fail',
}

type Pass<T> = {
  readonly _tag: 'pass'
  readonly result: T
  readonly error: null
}

type Fail<E> = {
  readonly _tag: 'fail'
  readonly result: null
  readonly error: E
}

export type Try<E, T> = Pass<T> | Fail<E>

export const passed = <T>(result: T): Try<never, T> => ({
  _tag: 'pass',
  result,
  error: null,
})

export const failed = <E>(error: E): Try<E, never> => ({
  _tag: 'fail',
  result: null,
  error,
})

export const isPass = <T>(t: Try<unknown, T>): t is Pass<T> => t._tag === 'pass'
export const isFail = <E>(t: Try<E, unknown>): t is Fail<E> => t._tag === 'fail'

export const lambdaResult = <E, T>(t: Try<E, T>): APIGatewayProxyResult => {
  return {
    statusCode: isPass(t) ? 200 : 500,
    body: isPass(t) ? JSON.stringify(t.result) : JSON.stringify(t.error),
  }
}
