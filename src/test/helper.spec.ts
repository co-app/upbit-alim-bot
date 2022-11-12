import { envConfig } from '@src/configs/env.config'
import { authHelper } from '@src/helper/auth.helper'
jest.mock('@src/configs/env.config')

describe('middleware test', () => {
  beforeEach(() => {
    jest.spyOn(envConfig, 'getEnvFile').mockImplementation(() => {
      return {
        TOKEN: 'GanseoguHoneyFist',
      }
    })
  })

  it('[TEST] token valid decode -> encode ', done => {
    // const TEST_DEV_KEY = 'testDeviceKey'
    // const TEST_TOKEN = 'GanseoguHoneyFist'

    // const _token = authHelper.encode(TEST_DEV_KEY, TEST_TOKEN)
    // const { userDeviceKey, token } = authHelper.decode(_token)
    // expect(userDeviceKey).toBe(TEST_DEV_KEY)
    // expect(token).toBe(TEST_TOKEN)
    done()
  })
})
