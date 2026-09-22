import pgdb from ".db/pg";
import { createMiddleware } from "hono/factory";

let initializing: Promise<typeof pgdb> | null = null;

/** Lazily initializes the shared TypeORM DataSource exactly once per process. */
const ensureInitialized = () => {
	if (pgdb.isInitialized) return Promise.resolve(pgdb);
	if (!initializing) initializing = pgdb.initialize();
	return initializing;
};

/**
 * Attaches the shared TypeORM DataSource to `c.var.pgdb` for every request.
 * Mount once at the app root: `server.use('*', dbMiddleware)`.
 */
export const dbMiddleware = createMiddleware<LotemoV1.HonoEnv>(
	async (c, next) => {
		await ensureInitialized();
		c.set("pgdb", pgdb);
		await next();
	},
);
