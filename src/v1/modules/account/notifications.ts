import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { notImplemented } from "@/v1/lib/http";
import { paginatedResponseSchema, paginationQuery } from "@/v1/lib/pagination";

// TODO: wire handlers to db/entities/Notification.ts and NotificationPreference.ts via
// a repository layer. All routes here are scoped to the authenticated user ("me").

const app = new OpenAPIHono();

app.openapi(
	createRoute({
		method: "get",
		path: "/me/notifications",
		request: {
			query: paginationQuery.extend({
				unread: z.coerce.boolean().optional(),
			}),
		},
		responses: {
			200: {
				content: {
					"application/json": { schema: paginatedResponseSchema(z.any()) },
				},
				description: "The current user's notifications",
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
		method: "patch",
		path: "/me/notifications/read-all",
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Marked all notifications as read",
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
		path: "/me/notifications/{id}/read",
		request: { params: z.object({ id: z.coerce.number() }) },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Marked a single notification as read",
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
		path: "/me/notification-preferences",
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "The current user's notification channel preferences",
			},
		},
	}),
	(c) => c.json({}),
);

app.openapi(
	createRoute({
		method: "patch",
		path: "/me/notification-preferences",
		request: { body: { content: { "application/json": { schema: z.any() } } } },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Updated notification channel preferences",
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
