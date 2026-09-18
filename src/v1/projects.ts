import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/Project.ts via a repository layer
// NOTE: /projects/{projectId}/unit-types routes live in src/v1/project-unit-types.ts,
// matching the "Project Unit Types" Bruno collection folder.

const app = new OpenAPIHono();

const projectParams = z.object({
	slug: z.string(),
});

const projectIdParams = z.object({
	id: z.coerce.number(),
});

const projectListQuery = z.object({
	city: z.string().optional(),
	projectType: z.string().optional(),
	status: z.string().optional(),
	page: z.coerce.number().default(1),
	perPage: z.coerce.number().default(20),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/projects",
		request: { query: projectListQuery },
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
				description: "Paginated list of projects/developments",
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
		method: "get",
		path: "/projects/{slug}",
		request: { params: projectParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Project detail, including aggregated unit stats",
			},
			404: {
				content: {
					"application/json": { schema: z.object({ message: z.string() }) },
				},
				description: "Project not found",
			},
		},
	}),
	(c) => c.json({ message: "Not implemented" }, 404),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/projects",
		request: { body: { content: { "application/json": { schema: z.any() } } } },
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Created project",
			},
		},
	}),
	(c) => c.json({ message: "Not implemented" }, 501),
);

app.openapi(
	createRoute({
		method: "patch",
		path: "/projects/{id}",
		request: {
			params: projectIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Updated project",
			},
		},
	}),
	(c) => c.json({ message: "Not implemented" }, 501),
);

export default app;
