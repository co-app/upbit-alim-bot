import { upbitBotRedisClient } from '@src/configs/redis.config'

describe('redis test', () => {
  it('redis connect test', async () => {
    const redis = upbitBotRedisClient.getRedis()
    redis.set('foo', 'bar')
    const isExists = await redis.get('foo')
    redis.del('foo')

    expect(isExists).toBe('bar')
  })
})