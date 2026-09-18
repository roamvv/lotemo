import { noContentStub, notFoundStub, notImplemented } from ".lib/http";
import { paginatedResponseSchema, paginationQuery } from ".lib/pagination";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/Property.ts via a repository layer

const app = new OpenAPIHono();

const propertyIdParams = z.object({
	id: z.coerce.number(),
});

const propertyListQuery = paginationQuery.extend({
	city: z.string().optional(),
	propertyType: z.string().optional(),
	propertyStatus: z.string().optional(),
	minPrice: z.coerce.number().optional(),
	maxPrice: z.coerce.number().optional(),
	bedrooms: z.coerce.number().optional(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/properties",
		request: { query: propertyListQuery },
		responses: {
			200: {
				content: {
					"application/json": { schema: paginatedResponseSchema(z.any()) },
				},
				description: "Paginated, filterable property listing search",
			},
		},
	}),
	(c) => {
		const { page, perPage } = c.req.valid("query");
		return c.json({ data: [], page, perPage, total: 0 });
	},
);

app.openapi(
	createRoute({
		method: "post",
		path: "/properties",
		request: { body: { content: { "application/json": { schema: z.any() } } } },
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Created a property listing",
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
		method: "get",
		path: "/properties/{slug}",
		request: { params: z.object({ slug: z.string() }) },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Public property listing detail",
			},
			404: {
				content: {
					"application/json": { schema: z.object({ message: z.string() }) },
				},
				description: "Property not found",
			},
		},
	}),
	(c) => notFoundStub(c, "Property not found"),
);

app.openapi(
	createRoute({
		method: "patch",
		path: "/properties/{id}",
		request: {
			params: propertyIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Updated property listing",
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
		path: "/properties/{id}",
		request: { params: propertyIdParams },
		responses: {
			204: { description: "Property listing deleted" },
		},
	}),
	(c) => noContentStub(c),
);

app.openapi(
	createRoute({
		method: "patch",
		path: "/properties/{id}/status",
		request: {
			params: propertyIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Updated property status (e.g. AVAILABLE, RESERVED, SOLD)",
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
		path: "/properties/{id}/verification",
		request: {
			params: propertyIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Updated property verification state (admin/moderation)",
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
