import { SchemaParams } from '@src/utils/interface'
import joi from 'joi'

export interface FavorCoinParams extends SchemaParams {
  favor_coin_list: string[]
}

export const FavorCoinSchem = joi.object<FavorCoinParams>({
  user_device_key: joi.string().required(), // header -> body.data
  favor_coin_list: joi.allow(),
})
