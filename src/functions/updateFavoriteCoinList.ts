import { authMiddleware, loggerMiddleware, schemaMiddleware } from '../middlewares'
import { FavorCoinSchem } from '../schema/favorCoinSchema'
import { router } from '../utils/router'
import { lambdaResult, passed } from '../utils/try'
import { APIGatewayProxyResult } from 'aws-lambda'
import { ProxyEvent } from '../utils/interface'

export const handler = router(
  [authMiddleware(), loggerMiddleware(), schemaMiddleware(FavorCoinSchem)],
  async (e: ProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('handler : ' + e._body)
    return lambdaResult(passed(null))
  }
)
