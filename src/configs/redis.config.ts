import Redis from 'ioredis'
import dotenvSafe from 'dotenv-safe'
dotenvSafe.config({
  allowEmptyValues: true,
  example: './.env',
})

class UpbitBotRedisClient {
  getRedis() {
    return new Redis(`rediss://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_ENDPONT}:${process.env.REDIS_PORT}`)
  }
}

export const upbitBotRedisClient = new UpbitBotRedisClient()
