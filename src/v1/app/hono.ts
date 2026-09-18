import { Hono } from "hono";

import appv1 from "..";

export const server = new Hono({ strict: true });

server.route("/", appv1);
