import { noContentStub, notImplemented } from "@/v1/lib/http";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/ProjectUnitType.ts via a repository layer
// NOTE: this mirrors the /projects/{projectId}/unit-types routes already stubbed
// in src/v1/projects.ts — kept here as its own file to match the Bruno collection
// layout ("Project Unit Types" is a separate folder from "Projects").

const app = new OpenAPIHono();

const projectParams = z.object({
	projectId: z.coerce.number(),
});

const unitTypeParams = z.object({
	projectId: z.coerce.number(),
	id: z.coerce.number(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/projects/{projectId}/unit-types",
		request: { params: projectParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "Unit-type facets for a project (Studio, 1BR, 2BR…)",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/projects/{projectId}/unit-types",
		request: {
			params: projectParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Created unit type",
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
		path: "/projects/{projectId}/unit-types/{id}",
		request: {
			params: unitTypeParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Updated unit type",
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
		path: "/projects/{projectId}/unit-types/{id}",
		request: { params: unitTypeParams },
		responses: {
			204: { description: "Unit type deleted" },
		},
	}),
	(c) => noContentStub(c),
);

export default app;
