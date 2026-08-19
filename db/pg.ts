import 'dotenv/config'

import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const opts: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL ?? '',
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  logging: false,
  entities: ['./db/entities/*.ts'],
  migrations: ['./db/migrations/*.ts'],
  migrationsTableName: '__migrations',
  migrationsTransactionMode: 'all',
  seeds: ['./db/seeds/**/*{.ts,.js}'],
  factories: ['./db/factories/**/*{.ts,.js}'],
  seedTracking: false,
}

export default new DataSource(opts)