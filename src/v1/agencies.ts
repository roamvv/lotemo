import { notFoundStub, notImplemented } from ".lib/http";
import { paginatedResponseSchema, paginationQuery } from ".lib/pagination";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/Agency.ts via a repository layer

const app = new OpenAPIHono();

const agencyIdParams = z.object({
	id: z.coerce.number(),
});

const agencyListQuery = paginationQuery.extend({
	city: z.string().optional(),
	verification: z.string().optional(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/agencies",
		request: { query: agencyListQuery },
		responses: {
			200: {
				content: {
					"application/json": { schema: paginatedResponseSchema(z.any()) },
				},
				description: "Paginated list of agencies/brokerages",
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
		path: "/agencies",
		request: { body: { content: { "application/json": { schema: z.any() } } } },
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Created agency",
			},
		},
	}),
	(c) => notImplemented(c),
);

app.openapi(
	createRoute({
		method: "get",
		path: "/agencies/{slug}",
		request: { params: z.object({ slug: z.string() }) },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Public agency profile",
			},
			404: {
				content: {
					"application/json": { schema: z.object({ message: z.string() }) },
				},
				description: "Agency not found",
			},
		},
	}),
	(c) => notFoundStub(c, "Agency not found"),
);

app.openapi(
	createRoute({
		method: "patch",
		path: "/agencies/{id}",
		request: {
			params: agencyIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Updated agency",
			},
		},
	}),
	(c) => notImplemented(c),
);

app.openapi(
	createRoute({
		method: "get",
		path: "/agencies/{id}/stats",
		request: { params: agencyIdParams },
		responses: {
			// Dashboard summary: activeListingCount, viewsCount, totalClosedTransactionCount, leads this month, etc.
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Dashboard summary stats for an agency",
			},
		},
	}),
	(c) => c.json({}),
);

export default app;
