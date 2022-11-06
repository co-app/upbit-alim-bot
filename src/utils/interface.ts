import { APIGatewayProxyEvent } from 'aws-lambda'

export type Middleware<T> = (e: T, next: (e: T) => Promise<any>) => Promise<any>

export interface ICoin {
  market: string
  korean_name: string
  english_name: string
  market_warning?: boolean
  coin_name?: string
}

export interface Dictionary<T> {
  [x: string]: T
}
