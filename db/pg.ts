import "dotenv/config";

import invariant from "tiny-invariant";
import { DataSource, type DataSourceOptions } from "typeorm";
import type { SeederOptions } from "typeorm-extension";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

invariant(process.env.DATABASE_URL, "DATABASE_URL is not defined");

const opts: DataSourceOptions & SeederOptions = {
	type: "postgres",
	url: process.env.DATABASE_URL ?? "",
	namingStrategy: new SnakeNamingStrategy(),
	synchronize: false,
	logging: false,
	entities: ["./db/entities/*.ts"],
	migrations: ["./db/migrations/*.ts"],
	migrationsTableName: "__migrations",
	migrationsTransactionMode: "all",
	seeds: ["./db/seeds/**/*{.ts,.js}"],
	factories: ["./db/factories/**/*{.ts,.js}"],
	seedTracking: false,
};

export default new DataSource(opts);
