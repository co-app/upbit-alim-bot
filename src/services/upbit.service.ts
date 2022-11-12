import { map, pipe, toArray, toAsync } from '@fxts/core'
import { Dictionary, ICoin } from '../utils/interface'
import axios from 'axios'
import { failed, passed } from '../utils/try'
import { cacheRepository } from '@src/repository/cache.repository'

enum UPBIT_API {
  COIN_LIST = 'https://api.upbit.com/v1/market/all',
  COIN_LIST_OF_PRICE = 'https://api.upbit.com/v1/ticker',
}

type PickCoinParams = Pick<ICoin, 'market' | 'coin_name' | 'is_warning'>

class UpbitServiceManager {
  private async getListOfCoinFromUpbit(): Promise<PickCoinParams[]> {
    return await pipe(
      Promise.resolve(axios.get(UPBIT_API.COIN_LIST)),
      item => item.data as ICoin[],
      map(coin => {
        return {
          market: coin.market,
          coin_name: coin.korean_name,
          is_warning: coin?.market_warning ?? false,
        }
      }),
      toArray
    )
  }

  async getListOfCoin() {
    try {
      const coinList = await cacheRepository.getListOfCoin<PickCoinParams[]>()
      if (coinList) return passed(coinList)

      console.log('Not Exists Cache')
      const result: PickCoinParams[] = await this.getListOfCoinFromUpbit()
      await cacheRepository.setCache('coinList', JSON.stringify(result), 3600)
      return passed(
        result.reduce((acc, cur) => {
          acc[cur.market] = { ...cur }
          return acc
        }, {})
      )
    } catch (e) {
      console.error(e)
      return failed(e)
    }
  }

  /**
   * @todo Refactoring
   * 1. Divide
   * 2. use FP
   */
  async getListOfCoinPrice(marketList: string[]) {
    try {
      const apis = pipe(
        marketList,
        map(market => `${UPBIT_API.COIN_LIST_OF_PRICE}?markets=${market}`),
        toArray
      )

      const updates: { status; data }[] = []
      const promises = apis.map(async url => {
        const json = await axios.get(url)
        updates.push(json)
      })

      await Promise.all(promises)

      return passed(
        updates
          .filter(item => item.status === 200)
          .map(item => item.data)
          .flat()
      )
    } catch (e) {
      console.error(e)
      return failed(e)
    }
  }

  mergeCoinLists(coinList: Dictionary<{ coin_name }>, coinListOfPrice: { market }[]) {
    return pipe(
      coinListOfPrice,
      map(item => {
        return {
          ...item,
          coin_name: coinList[item.market].coin_name,
        }
      }),
      toArray
    )
  }
}

export const upbitServiceManager = new UpbitServiceManager()
