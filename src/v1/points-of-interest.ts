import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/PointOfInterest.ts via a spatial (ST_DWithin) repository query

const app = new OpenAPIHono();

app.openapi(
	createRoute({
		method: "get",
		path: "/properties/{propertyId}/nearby",
		request: {
			params: z.object({ propertyId: z.coerce.number() }),
			query: z.object({
				category: z.string().optional(),
				radiusKm: z.coerce.number().default(3),
			}),
		},
		responses: {
			200: {
				content: {
					"application/json": {
						schema: z.any(),
					},
				},
				description:
					"Nearby facilities grouped by category (school, clinic, attraction…)",
			},
		},
	}),
	(c) => c.json({}),
);

app.openapi(
	createRoute({
		method: "get",
		path: "/points-of-interest",
		request: {
			query: z.object({
				category: z.string().optional(),
				page: z.coerce.number().default(1),
				perPage: z.coerce.number().default(20),
			}),
		},
		responses: {
			200: {
				content: {
					"application/json": {
						schema: z.object({
							data: z.array(z.any()),
							page: z.number(),
							perPage: z.number(),
							total: z.number(),
						}),
					},
				},
				description: "Admin listing of the POI cache",
			},
		},
	}),
	(c) =>
		c.json({
			data: [],
			page: c.req.valid("query").page,
			perPage: c.req.valid("query").perPage,
			total: 0,
		}),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/points-of-interest",
		request: { body: { content: { "application/json": { schema: z.any() } } } },
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Upserted POI, keyed by sourceProvider + sourceId",
			},
			501: {
				content: { "application/json": { schema: z.any() } },
				description: "Not implemented",
			},
		},
	}),
	(c) => c.json({ message: "Not implemented" }, 501),
);

export default app;
