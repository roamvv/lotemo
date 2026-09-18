import { createMiddleware } from "hono/factory";

import { auth } from "@/auth";

type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

type AuthEnv = TotemoV1.HonoEnv & {
	Variables: TotemoV1.HonoEnv["Variables"] & {
		session: NonNullable<Session>["session"];
		user: NonNullable<Session>["user"];
	};
};

/**
 * Rejects the request with 401 unless better-auth resolves a session from
 * the incoming cookies/headers. On success, `c.var.user` / `c.var.session`
 * are populated for downstream handlers.
 */
export const requireAuth = createMiddleware<AuthEnv>(async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) return c.json({ message: "Unauthorized" }, 401);

	c.set("session", session.session);
	c.set("user", session.user);

	await next();
});

/**
 * Same as `requireAuth`, but only enforces the `admin` role from the
 * better-auth `admin()` plugin. Mount `requireAuth` first if you need
 * `c.var.user` populated too.
 */
export const requireAdmin = createMiddleware<AuthEnv>(async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) return c.json({ message: "Unauthorized" }, 401);
	if ((session.user as { role?: string }).role !== "admin") {
		return c.json({ message: "Forbidden" }, 403);
	}

	c.set("session", session.session);
	c.set("user", session.user);

	await next();
});
