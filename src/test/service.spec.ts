import axios from 'axios'
import { upbitServiceManager } from '../services/upbit.service'
import fs from 'fs'
jest.mock('axios')

describe('service test', () => {
  beforeEach(async () => {
    jest.spyOn(axios, 'get').mockImplementation(async () => {
      return {
        data: JSON.parse(fs.readFileSync('src/test/mockData/coin.json', 'utf-8')),
      }
    })
  })

  it('upbit coin list dict ', async () => {
    const t = await upbitServiceManager.getListOfCoin()
    expect(t._tag).toBe('pass')
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
