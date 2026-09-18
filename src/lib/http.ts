import type { Context } from "hono";

/** Standard "not implemented yet" response for stubbed mutation endpoints. */
export const notImplemented = (c: Context) =>
	c.json({ message: "Not implemented" }, 501);

/** Standard 404 for stubbed lookups that don't have a backing query yet. */
export const notFoundStub = (c: Context, message = "Not found") =>
	c.json({ message }, 404);

/** Standard empty 204 for stubbed delete endpoints. */
export const noContentStub = (c: Context) => c.body(null, 204);
