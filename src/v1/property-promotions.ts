import { noContentStub, notImplemented } from ".lib/http";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/PropertyListingPromotion.ts via a repository layer

const app = new OpenAPIHono();

app.openapi(
	createRoute({
		method: "get",
		path: "/properties/{propertyId}/promotions",
		request: { params: z.object({ propertyId: z.coerce.number() }) },
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "Active promotions/boosts on a property listing",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/properties/{propertyId}/promotions",
		request: {
			params: z.object({ propertyId: z.coerce.number() }),
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Boosted a listing (started a paid promotion)",
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
		path: "/promotions/{id}",
		request: { params: z.object({ id: z.coerce.number() }) },
		responses: {
			204: { description: "Promotion canceled" },
		},
	}),
	(c) => noContentStub(c),
);

export default app;
