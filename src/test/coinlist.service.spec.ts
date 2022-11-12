import axios from 'axios'
import { upbitServiceManager } from '../services/upbit.service'
import fs from 'fs'
import { cacheRepository } from '@src/repository/cache.repository'
jest.mock('axios')
jest.mock('@src/repository/cache.repository')

describe('service test', () => {
  beforeEach(async () => {
    const coinList = JSON.parse(fs.readFileSync('src/test/mockData/coin.json', 'utf-8'))

    jest.spyOn(axios, 'get').mockImplementation(async () => {
      return {
        data: coinList,
      }
    })

    jest.spyOn(cacheRepository, 'getListOfCoin').mockImplementation(async () => {
      return coinList
    })
  })

  it('upbit coin list dict not exist cahce', async () => {
    const t = await upbitServiceManager.getListOfCoin()

    expect(t._tag).toBe('pass')
    if (t._tag === 'pass') {
      expect(Object.keys(t.result).length).toBe(51)
    }
  })

  it('upbit coin list dict -> not exists cahce', async () => {
    jest.spyOn(cacheRepository, 'getListOfCoin').mockImplementation(async () => {
      return null
    })

    const t = await upbitServiceManager.getListOfCoin()

    expect(t._tag).toBe('pass')
    if (t._tag === 'pass') {
      expect(Object.keys(t.result).length).toBe(51)
    }
  })

  it('upbit coin list price', async () => {
    const t = await upbitServiceManager.getListOfCoinPrice(['KRW-BTC', 'BTC-ETH'])

    expect(t._tag).toBe('pass')
  })

  it('merge coinlist', async () => {
    const favorCoinList = ['KRW-BTC', 'BTC-ETH']

    const [coinList, coinListOfPrice] = await Promise.all([
      upbitServiceManager.getListOfCoin(),
      upbitServiceManager.getListOfCoinPrice(favorCoinList),
    ])

    expect(coinList._tag).toBe('pass')
    expect(coinListOfPrice._tag).toBe('pass')
  })
})
