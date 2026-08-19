import 'dotenv/config'

import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL ?? '',
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  logging: false,
  entities: ['./db/entities/*.ts'],
  migrations: ['./db/migrations/*.ts'],
  migrationsTableName: '__migrations',
  migrationsTransactionMode: 'all',
})