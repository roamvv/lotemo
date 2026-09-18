import { noContentStub, notImplemented } from "@/v1/lib/http";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/AgencyServiceArea.ts via a repository layer

const app = new OpenAPIHono();

const agencyParams = z.object({
	agencyId: z.coerce.number(),
});

const agencyServiceAreaParams = z.object({
	agencyId: z.coerce.number(),
	id: z.coerce.number(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/agencies/{agencyId}/service-areas",
		request: { params: agencyParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "Locations this agency actively serves",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/agencies/{agencyId}/service-areas",
		request: {
			params: agencyParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Added service area",
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
		path: "/agencies/{agencyId}/service-areas/{id}",
		request: {
			params: agencyServiceAreaParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Updated service area",
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
		path: "/agencies/{agencyId}/service-areas/{id}",
		request: { params: agencyServiceAreaParams },
		responses: {
			204: { description: "Service area removed" },
		},
	}),
	(c) => noContentStub(c),
);

export default app;
