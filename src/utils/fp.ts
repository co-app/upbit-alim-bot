/**
 * @desc needs a parameter
 */
export const go = <T>(params: T, ...fns): T => {
  let result: T = params
  for (const fn of fns) result = fn(result)
  return result
}

/**
 * @desc needs a parameter use Promise
 */
export const asyncGo = async <T>(params: T, ...promiseFns): Promise<T> => {
  let result: T = params
  for (const promiseFn of promiseFns) result = await promiseFn(result)
  return result
}
