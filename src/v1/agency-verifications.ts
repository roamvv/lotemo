import { notImplemented } from ".lib/http";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/AgencyVerification.ts via a repository layer

const app = new OpenAPIHono();

const agencyParams = z.object({
	agencyId: z.coerce.number(),
});

const agencyVerificationParams = z.object({
	agencyId: z.coerce.number(),
	id: z.coerce.number(),
});

const verificationIdParams = z.object({
	id: z.coerce.number(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/agencies/{agencyId}/verifications",
		request: { params: agencyParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Latest verification status for an agency",
			},
		},
	}),
	(c) => c.json({}),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/agencies/{agencyId}/verifications",
		request: {
			params: agencyParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Submitted a new verification request",
			},
		},
	}),
	(c) => notImplemented(c),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/agencies/{agencyId}/verifications/{id}/documents",
		request: {
			params: agencyVerificationParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Uploaded a supporting verification document",
			},
		},
	}),
	(c) => notImplemented(c),
);

app.openapi(
	createRoute({
		method: "patch",
		path: "/admin/verifications/{id}/approve",
		request: { params: verificationIdParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Approved the verification request",
			},
		},
	}),
	(c) => notImplemented(c),
);

app.openapi(
	createRoute({
		method: "patch",
		path: "/admin/verifications/{id}/reject",
		request: {
			params: verificationIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Rejected the verification request",
			},
		},
	}),
	(c) => notImplemented(c),
);

export default app;
