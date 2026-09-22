import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/Location.ts via a repository layer

const app = new OpenAPIHono();

app.openapi(
	createRoute({
		method: "get",
		path: "/locations",
		request: {
			query: z.object({
				class: z.string().optional(),
				parentId: z.coerce.number().optional(),
			}),
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description:
					"Locations (region/province/city/barangay) tree, filterable by class and parent",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "get",
		path: "/locations/search",
		request: { query: z.object({ q: z.string() }) },
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "Typeahead search over locations by name",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "get",
		path: "/locations/{id}",
		request: { params: z.object({ id: z.coerce.number() }) },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Location detail",
			},
			404: {
				content: {
					"application/json": { schema: z.object({ message: z.string() }) },
				},
				description: "Location not found",
			},
		},
	}),
	(c) => c.json({ message: "Not implemented" }, 404),
);

export default app;
