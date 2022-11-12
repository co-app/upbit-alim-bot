import dotenvSafe from 'dotenv-safe'
dotenvSafe.config({
  allowEmptyValues: true,
  example: './.env',
})

class EnvConfig {
  /**
   * @todo
   */
  getRedisEnv() {
    return {}
  }

  getEnvFile() {
    return {
      TOKEN: process.env.TOKEN,
    }
  }
}

export const envConfig = new EnvConfig()
