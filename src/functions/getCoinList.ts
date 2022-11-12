import { authMiddleware, loggerMiddleware } from '../middlewares/index'
import { router } from '../utils/router'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { upbitServiceManager } from '../services/upbit.service'
import { lambdaResult } from '../utils/try'

export const handler = router([loggerMiddleware()], async (e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return lambdaResult(await upbitServiceManager.getListOfCoin())
})
