import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { noContentStub, notImplemented } from "@/v1/lib/http";

// TODO: wire handlers to db/entities/UserSavedSearch.ts and UserSavedProperty.ts via a repository layer
// NOTE: all routes here are scoped to the authenticated user ("me") — mount `requireAuth`
// (see src/v1/middleware/auth.ts) once these are wired up.

const app = new OpenAPIHono();

app.openapi(
	createRoute({
		method: "get",
		path: "/me/saved-searches",
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "The current user's saved search alerts",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/me/saved-searches",
		request: { body: { content: { "application/json": { schema: z.any() } } } },
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Created a saved search",
			},
			501: {
				content: { "application/json": { schema: z.any() } },
				description: "Not implemented",
			},
		},
	}),
	(c) => notImplemented(c),
);

app.openapi(
	createRoute({
		method: "delete",
		path: "/me/saved-searches/{id}",
		request: { params: z.object({ id: z.coerce.number() }) },
		responses: {
			204: { description: "Saved search deleted" },
		},
	}),
	(c) => noContentStub(c),
);

app.openapi(
	createRoute({
		method: "get",
		path: "/me/saved-properties",
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "The current user's saved (favorited) properties",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/me/saved-properties",
		request: { body: { content: { "application/json": { schema: z.any() } } } },
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Saved a property",
			},
			501: {
				content: { "application/json": { schema: z.any() } },
				description: "Not implemented",
			},
		},
	}),
	(c) => notImplemented(c),
);

app.openapi(
	createRoute({
		method: "delete",
		path: "/me/saved-properties/{propertyId}",
		request: { params: z.object({ propertyId: z.coerce.number() }) },
		responses: {
			204: { description: "Property unsaved" },
		},
	}),
	(c) => noContentStub(c),
);

export default app;
