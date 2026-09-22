import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { noContentStub, notImplemented } from "@/v1/lib/http";

// TODO: wire handlers to db/entities/AgencyMember.ts via a repository layer

const app = new OpenAPIHono();

const agencyParams = z.object({
	agencyId: z.coerce.number(),
});

const agencyMemberParams = z.object({
	agencyId: z.coerce.number(),
	id: z.coerce.number(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/agencies/{agencyId}/members",
		request: {
			params: agencyParams,
			query: z.object({
				role: z.string().optional(),
				status: z.string().optional(),
			}),
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "Members belonging to this agency",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/agencies/{agencyId}/members",
		request: {
			params: agencyParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Added member",
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
		path: "/agencies/{agencyId}/members/{id}",
		request: {
			params: agencyMemberParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Updated member role",
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
		path: "/agencies/{agencyId}/members/{id}/suspend",
		request: { params: agencyMemberParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Suspended member",
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
		path: "/agencies/{agencyId}/members/{id}",
		request: { params: agencyMemberParams },
		responses: {
			204: { description: "Member removed" },
		},
	}),
	(c) => noContentStub(c),
);

export default app;
