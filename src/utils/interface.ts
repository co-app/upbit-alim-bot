import { APIGatewayProxyEvent } from 'aws-lambda'

export type Middleware<T> = (e: T, next: (e: T) => Promise<any>) => Promise<any>

export type ProxyEvent = APIGatewayProxyEvent & {
  _body: any
}

export interface ICoin {
  market: string
  korean_name: string
  english_name: string
  market_warning?: boolean
  coin_name?: string
  is_warning?: boolean
}

export interface IToken {
  userDeviceKey: string
  token: string
}

export interface CheckCoinParams extends IToken {
  isCorrect: boolean
}

export interface Dictionary<T> {
  [x: string]: T
}

export interface SchemaParams {
  user_device_key: string
}
