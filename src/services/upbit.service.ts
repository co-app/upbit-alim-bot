import { map, pipe, toArray, toAsync } from '@fxts/core'
import { Dictionary, ICoin } from '../utils/interface'
import axios from 'axios'
import { failed, passed } from '../utils/try'

enum UPBIT_API {
  COIN_LIST = 'https://api.upbit.com/v1/market/all',
  COIN_LIST_OF_PRICE = 'https://api.upbit.com/v1/ticker',
}

class UpbitServiceManager {
  async getListOfCoin() {
    try {
      const result = await pipe(
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
