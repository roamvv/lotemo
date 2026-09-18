import { notImplemented } from ".lib/http";
import { paginatedResponseSchema, paginationQuery } from ".lib/pagination";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/Message.ts via a repository layer

const app = new OpenAPIHono();

const conversationParams = z.object({
	conversationId: z.string(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/conversations/{conversationId}/messages",
		request: { params: conversationParams, query: paginationQuery },
		responses: {
			200: {
				content: {
					"application/json": { schema: paginatedResponseSchema(z.any()) },
				},
				description: "Messages in a conversation, oldest or newest first",
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
		path: "/conversations/{conversationId}/messages",
		request: {
			params: conversationParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Sent a message in the conversation",
			},
		},
	}),
	(c) => notImplemented(c),
);

app.openapi(
	createRoute({
		method: "patch",
		path: "/messages/{id}/read",
		request: { params: z.object({ id: z.coerce.number() }) },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Marked a single message as read",
			},
		},
	}),
	(c) => notImplemented(c),
);

export default app;
