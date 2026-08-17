import 'dotenv/config'

import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const DefaultDataSource = new DataSource({
  type: 'mysql',
  host: process.env.TIDB_HOST,
  port: parseInt(process.env.TIDB_PORT || '3306'),
  username: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: process.env.TIDB_ENABLE_SSL === 'true',
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  logging: false,
  entities: ['./db/entities/*.ts'],
  migrations: ['./db/migrations/*.ts'],
})
