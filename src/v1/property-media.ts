import { noContentStub, notImplemented } from ".lib/http";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/PropertyMedia.ts via a repository layer.
// Uploads should go through `c.var.s3` (see src/context/s3.ts / src/s3.ts).

const app = new OpenAPIHono();

const propertyParams = z.object({
	propertyId: z.coerce.number(),
});

const propertyMediaParams = z.object({
	propertyId: z.coerce.number(),
	id: z.coerce.number(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/properties/{propertyId}/media",
		request: { params: propertyParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "Photos/media for a property, in display order",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/properties/{propertyId}/media",
		request: {
			params: propertyParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Added a media item (photo/video) to a property",
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
		method: "patch",
		path: "/properties/{propertyId}/media/reorder",
		request: {
			params: propertyParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "Reordered a property's media (e.g. new cover photo)",
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
		path: "/properties/{propertyId}/media/{id}",
		request: { params: propertyMediaParams },
		responses: {
			204: { description: "Media item deleted" },
		},
	}),
	(c) => noContentStub(c),
);

export default app;
