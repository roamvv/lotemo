
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string
    BETTER_AUTH_URL: string
    BETTER_AUTH_SECRET: string
    TIDB_HOST: string
    TIDB_PORT: string
    TIDB_USER: string
    TIDB_PASSWORD: string
    TIDB_DATABASE: string
    TIDB_ENABLE_SSL: string
    S3_REGION: string
    S3_ENDPOINT: string
    S3_ACCESS_KEY: string
    S3_SECRET_ACCESS_KEY: string
  }
}