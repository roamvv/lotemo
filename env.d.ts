
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string
    BETTER_AUTH_URL: string
    BETTER_AUTH_SECRET: string
    DATABASE_URL: string
    S3_REGION: string
    S3_ENDPOINT: string
    S3_ACCESS_KEY: string
    S3_SECRET_ACCESS_KEY: string
  }
}