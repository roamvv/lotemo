import { notImplemented } from ".lib/http";
import { paginatedResponseSchema, paginationQuery } from ".lib/pagination";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/ModerationReport.ts, ModerationAction.ts and
// ModerationAuditLog.ts via a repository layer. All /admin/* routes here should sit
// behind `requireAdmin` (see src/v1/middleware/auth.ts) once implemented.

const app = new OpenAPIHono();

const reportIdParams = z.object({
	id: z.coerce.number(),
});

app.openapi(
	createRoute({
		method: "post",
		path: "/moderation/reports",
		request: { body: { content: { "application/json": { schema: z.any() } } } },
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Reported a piece of content (listing, review, message…)",
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
		path: "/admin/moderation/reports",
		request: {
			query: paginationQuery.extend({
				status: z.string().optional(),
				targetType: z.string().optional(),
			}),
		},
		responses: {
			200: {
				content: {
					"application/json": { schema: paginatedResponseSchema(z.any()) },
				},
				description: "Paginated moderation report queue",
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
		method: "get",
		path: "/admin/moderation/reports/{id}",
		request: { params: reportIdParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Moderation report detail",
			},
			404: {
				content: {
					"application/json": { schema: z.object({ message: z.string() }) },
				},
				description: "Report not found",
			},
		},
	}),
	(c) => c.json({ message: "Not implemented" }, 404),
);

app.openapi(
	createRoute({
		method: "patch",
		path: "/admin/moderation/reports/{id}/action",
		request: {
			params: reportIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Took an action (dismiss, warn, remove, ban…) on a report",
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
		path: "/admin/moderation/audit-logs",
		request: {
			query: paginationQuery.extend({
				entityType: z.string().optional(),
				entityId: z.coerce.number().optional(),
			}),
		},
		responses: {
			200: {
				content: {
					"application/json": { schema: paginatedResponseSchema(z.any()) },
				},
				description: "Paginated moderation audit trail",
			},
		},
	}),
	(c) => {
		const { page, perPage } = c.req.valid("query");
		return c.json({ data: [], page, perPage, total: 0 });
	},
);

export default app;
