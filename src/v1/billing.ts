import { noContentStub, notImplemented } from ".lib/http";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

// TODO: wire handlers to db/entities/BillingPayment*.ts, BillingInvoice.ts, BillingCoupon.ts via a repository layer

const app = new OpenAPIHono();

const agencyParams = z.object({
	agencyId: z.coerce.number(),
});

const agencyInvoiceParams = z.object({
	agencyId: z.coerce.number(),
	id: z.coerce.number(),
});

const paymentIdParams = z.object({
	id: z.coerce.number(),
});

app.openapi(
	createRoute({
		method: "get",
		path: "/billing/plans",
		request: {
			query: z.object({
				type: z.string().optional(),
				isActive: z.coerce.boolean().optional(),
			}),
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "Available billing plans",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/billing/coupons/redeem",
		request: { body: { content: { "application/json": { schema: z.any() } } } },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Redeemed coupon, with discount applied",
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
		path: "/agencies/{agencyId}/subscription",
		request: { params: agencyParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Agency's current subscription plan",
			},
		},
	}),
	(c) => c.json({}),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/agencies/{agencyId}/subscription",
		request: {
			params: agencyParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Subscribed to, or upgraded, a billing plan",
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
		path: "/agencies/{agencyId}/subscription",
		request: { params: agencyParams },
		responses: {
			204: { description: "Subscription canceled" },
		},
	}),
	(c) => noContentStub(c),
);

app.openapi(
	createRoute({
		method: "get",
		path: "/agencies/{agencyId}/payments",
		request: {
			params: agencyParams,
			query: z.object({
				purpose: z.string().optional(),
				status: z.string().optional(),
			}),
		},
		responses: {
			200: {
				content: { "application/json": { schema: z.array(z.any()) } },
				description: "Payment history for an agency",
			},
		},
	}),
	(c) => c.json([]),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/agencies/{agencyId}/payments",
		request: {
			params: agencyParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Created a one-off payment (e.g. for a promotion boost)",
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
		path: "/agencies/{agencyId}/invoices/{id}",
		request: { params: agencyInvoiceParams },
		responses: {
			200: {
				content: { "application/json": { schema: z.any() } },
				description: "Invoice detail",
			},
			404: {
				content: {
					"application/json": { schema: z.object({ message: z.string() }) },
				},
				description: "Invoice not found",
			},
		},
	}),
	(c) => c.json({ message: "Not implemented" }, 404),
);

app.openapi(
	createRoute({
		method: "post",
		path: "/payments/{id}/refund",
		request: {
			params: paymentIdParams,
			body: { content: { "application/json": { schema: z.any() } } },
		},
		responses: {
			201: {
				content: { "application/json": { schema: z.any() } },
				description: "Requested a refund for a payment",
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
