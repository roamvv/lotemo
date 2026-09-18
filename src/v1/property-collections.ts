import { noContentStub, notImplemented } from "@/v1/lib/http";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/PropertyCollection.ts and PropertyCollectionItem.ts
// via a repository layer. Collections are user-owned ("my collections") — mount
// `requireAuth` (see src/v1/middleware/auth.ts) once these are wired up.

const app = new OpenAPIHono();

const collectionParams = z.object({
	collectionId: z.coerce.number(),
});

const collectionPropertyParams = z.object({
	collectionId: z.coerce.number(),
	propertyId: z.coerce.number(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/collections",
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "The current user's saved-property collections",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/collections",
		request: { body: { content: { "application/json": { schema: z.any() } } } },
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Created a collection",
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
		method: "post",
		path: "/collections/{collectionId}/properties",
		request: {
			params: collectionParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Added a property to the collection",
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
		path: "/collections/{collectionId}/properties/{propertyId}",
		request: { params: collectionPropertyParams },
		responses: {
			204: { description: "Property removed from the collection" },
		},
	}),
	(c) => noContentStub(c),
);

export default app;
