import { notImplemented } from ".lib/http";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/ContactInquiry.ts via a repository layer

const app = new OpenAPIHono();

app.openapi(
	createRoute({
		method: "post",
		path: "/properties/{propertyId}/inquiries",
		request: {
			params: z.object({ propertyId: z.coerce.number() }),
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Created a buyer/renter inquiry on a property",
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
		path: "/inquiries/{id}",
		request: { params: z.object({ id: z.coerce.number() }) },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Inquiry detail",
			},
			404: {
				content: {
					"application/json": { schema: z.object({ message: z.string() }) },
				},
				description: "Inquiry not found",
			},
		},
	}),
	(c) => c.json({ message: "Not implemented" }, 404),
);

app.openapi(
	createRoute({
		method: "get",
		path: "/agencies/{agencyId}/inquiries",
		request: { params: z.object({ agencyId: z.coerce.number() }) },
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "Inquiries received by an agency",
			},
		},
	}),
	(c) => c.json([]),
);

export default app;
