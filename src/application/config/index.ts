import 'dotenv/config'

export class Config {
  private constructor(
    public readonly DATABASE_URL: string,
    public readonly PORT: number
  ) {}

  static load(): Config {
    return new Config(
      Config.getEnv('DATABASE_URL'),
      Config.getEnvNumber('PORT')
    )
  }

  private static getEnvNumber(envName: string): number {
    const val = Config.getEnv(envName)
    const numVal = Number(val)

    if (isNaN(numVal)) {
      throw new Error(`Environment variable ${envName} must be a valid number.`)
    }

    return numVal
  }

  private static getEnv(envName: string) {
    const val = process.env[envName]

    if (!val) {
      throw new Error(`Environment variable ${envName} is not set or empty.`)
    }

    return val
  }
}
