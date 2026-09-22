import { notImplemented } from "@/v1/lib/http";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/PropertyPrice.ts via a repository layer.
// "Update Price" appends a new price-history row rather than mutating one in place.

const app = new OpenAPIHono();

const propertyParams = z.object({
	propertyId: z.coerce.number(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/properties/{propertyId}/price",
		request: { params: propertyParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "A property's current price",
			},
			404: {
				content: {
					"application/json": { schema: z.object({ message: z.string() }) },
				},
				description: "No price set for this property",
			},
		},
	}),
	(c) => c.json({ message: "Not implemented" }, 404),
);

app.openapi(
	createRoute({
		method: "get",
		path: "/properties/{propertyId}/prices",
		request: { params: propertyParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "A property's full price history, newest first",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/properties/{propertyId}/prices",
		request: {
			params: propertyParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Recorded a new price for the property",
			},
			501: {
				content: { "application/json": { schema: z.any() } },
				description: "Not implemented",
			},
		},
	}),
	(c) => notImplemented(c),
);

export default app;
