
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string

    TIDB_HOST: string
    TIDB_PORT: string
    TIDB_USER: string
    TIDB_PASSWORD: string
    TIDB_DATABASE: string
    TIDB_ENABLE_SSL: string
  }
}