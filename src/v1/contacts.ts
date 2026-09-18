import { notImplemented } from ".lib/http";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/Contact.ts and ContactActivity.ts via a repository layer

const app = new OpenAPIHono();

const agencyParams = z.object({
	agencyId: z.coerce.number(),
});

const contactIdParams = z.object({
	id: z.coerce.number(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/agencies/{agencyId}/contacts",
		request: {
			params: agencyParams,
			query: z.object({ status: z.string().optional() }),
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "An agency's CRM contacts / leads",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/agencies/{agencyId}/contacts",
		request: {
			params: agencyParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Created contact",
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
		path: "/contacts/{id}",
		request: { params: contactIdParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Contact detail",
			},
			404: {
				content: {
					"application/json": { schema: z.object({ message: z.string() }) },
				},
				description: "Contact not found",
			},
		},
	}),
	(c) => c.json({ message: "Not implemented" }, 404),
);

app.openapi(
	createRoute({
		method: "patch",
		path: "/contacts/{id}",
		request: {
			params: contactIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Updated contact",
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
		path: "/contacts/{id}/assign",
		request: {
			params: contactIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Reassigned contact to another agency member",
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
		method: "post",
		path: "/contacts/{id}/activities",
		request: {
			params: contactIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description:
					"Logged a CRM activity (call, note, viewing…) against a contact",
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
