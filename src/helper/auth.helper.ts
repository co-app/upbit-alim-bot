import { go } from '../utils/fp'
import CryptoJS from 'crypto-js'
import { CheckCoinParams, IToken } from '../utils/interface'
import { envConfig } from '../configs/env.config'

class AuthHelper {
  decode(token: string): IToken {
    return go(
      token,
      (_token: string) => CryptoJS.AES.decrypt(_token, envConfig.getEnvFile().TOKEN as string),
      bytes => JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    ) as IToken
  }

  checkToken(params: IToken): CheckCoinParams {
    if (params.token === process.env.TOKEN) return { ...params, isCorrect: true }
    return { ...params, isCorrect: false }
  }

  encode(userDeviceKey: string, token: string): string {
    if (!userDeviceKey && !token) null

    return go(
      JSON.stringify({ userDeviceKey, token }),
      str => CryptoJS.AES.encrypt(str, process.env.TOKEN as string),
      bytes => bytes.toString()
    )
  }
}

export const authHelper = new AuthHelper()
