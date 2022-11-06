import { authMiddleware } from '../middlewares/auth.middleware'
import { loggerMiddleware } from '../middlewares/test.middleware'
import { router } from '../utils/router'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { upbitServiceManager } from '../services/upbit.service'
import { lambdaResult } from '../utils/try'

export const handler = router(
  [authMiddleware(), loggerMiddleware()],
  async (e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return lambdaResult(await upbitServiceManager.getListOfCoin())
  }
)
