import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

import {
	dummyQuoteSchema,
	getMessage,
} from "./hellov1.service";

const app = new OpenAPIHono();

app.openapi(
	createRoute({
		method: "get",
		path: "/hello",
		responses: {
			200: {
				content: {
					"application/json": {
						description: "The random message",
						schema: z.object({
							time: z.string(),
							message: z.string(),
							quote: dummyQuoteSchema,
						}),
					},
				},
			},
		},
	}),
	async (c) => {
		const res = await getMessage()
		return c.json(res)
	},
);

export default app;
