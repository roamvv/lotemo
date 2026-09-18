import { createMiddleware } from "hono/factory";

import s3 from "@/s3";

/**
 * Attaches the shared S3-compatible client to `c.var.s3` for every request.
 * Mount once at the app root: `server.use('*', s3Middleware)`.
 */
export const s3Middleware = createMiddleware<TotemoV1.HonoEnv>(
	async (c, next) => {
		c.set("s3", s3);
		await next();
	},
);
