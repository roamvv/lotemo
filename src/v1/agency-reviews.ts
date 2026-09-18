import { noContentStub, notImplemented } from ".lib/http";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/AgencyReview.ts via a repository layer
// NOTE: the bruno collection has both "Create Review" and "Create Agent Review"
// pointed at the same POST /agencies/{agencyId}/reviews endpoint (agency vs
// individual-agent review, disambiguated by body payload) — one route covers both.

const app = new OpenAPIHono();

const agencyParams = z.object({
	agencyId: z.coerce.number(),
});

const reviewIdParams = z.object({
	id: z.coerce.number(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/agencies/{agencyId}/reviews",
		request: {
			params: agencyParams,
			query: z.object({ class: z.string().optional() }),
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description:
					"Reviews for this agency (and, optionally, its individual agents)",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/agencies/{agencyId}/reviews",
		request: {
			params: agencyParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Created agency or agent review",
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
		path: "/reviews/{id}/flag",
		request: {
			params: reviewIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Flagged review for moderation",
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
		path: "/reviews/{id}",
		request: { params: reviewIdParams },
		responses: {
			204: { description: "Review deleted" },
		},
	}),
	(c) => noContentStub(c),
);

export default app;
