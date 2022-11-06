import { upbitServiceManager } from '../services/upbit.service'

describe('service test', () => {
  it('upbit coin list dict ', async () => {
    const t = await upbitServiceManager.getListOfCoin()

    console.log(t)
    expect(true).toBe(true)
  })

  it('upbit coin list price', async () => {
    const t = await upbitServiceManager.getListOfCoinPrice(['KRW-BTC', 'BTC-ETH'])

    console.log(t)
    expect(true).toBe(true)
  })

  it('merge coinlist', async () => {
    const favorCoinList = ['KRW-BTC', 'BTC-ETH']

    const [coinList, coinListOfPrice] = await Promise.all([
      upbitServiceManager.getListOfCoin(),
      upbitServiceManager.getListOfCoinPrice(favorCoinList),
    ])

    const mergeCoinList = upbitServiceManager.mergeCoinLists(coinList.result as {}, coinListOfPrice.result as [])
    console.log(mergeCoinList)
  })
})
