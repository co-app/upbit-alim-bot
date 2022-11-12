import { upbitBotRedisClient } from '@src/configs/redis.config'

enum CacheParams {
  COIN_OF_LIST = 'coinList',
}

export class CacheRepository {
  async getListOfCoin<T>(): Promise<null | T> {
    const result = await upbitBotRedisClient.getRedis().get(CacheParams.COIN_OF_LIST)

    if (result) {
      console.log('Cache Hit')
      return result as unknown as T
    }

    return null
  }

  async setCache(key: string, value: string, expiredSeconds?: number): Promise<void> {
    const isSet = await upbitBotRedisClient.getRedis().set(key, value)
    if (expiredSeconds) {
      await upbitBotRedisClient.getRedis().expire(key, expiredSeconds)
    }

    if (isSet !== 'OK') console.error(`${key} is not set`)
    return
  }
}

export const cacheRepository = new CacheRepository()
