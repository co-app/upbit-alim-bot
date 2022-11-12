import { failed, lambdaResult } from '../utils/try'
import { authHelper } from '../helper/auth.helper'
import { go } from '../utils/fp'
import { CheckCoinParams, Middleware, ProxyEvent } from '../utils/interface'

export const authMiddleware: <T extends ProxyEvent>() => Middleware<T> = () => {
  return (e, next) => {
    const token = e?.headers?.authorization

    if (!token) {
      throw new Error('Not Exists Token')
    }

    const { userDeviceKey, isCorrect } = go(authHelper.decode(<string>token), item =>
      authHelper.checkToken(item)
    ) as CheckCoinParams

    if (!isCorrect) {
      throw new Error('Invalid Token')
    }

    e._body = {
      ...JSON.parse(e.body as string),
      user_device_key: userDeviceKey,
    }

    return next(e)
  }
}
