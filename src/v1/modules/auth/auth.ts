import { Hono } from "hono";
import { auth } from "@/v1/app/auth";

const app = new Hono({ strict: true });

app.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

export default app;
