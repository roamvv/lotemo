import { server } from "@/v1/app/hono";

const createApp = () => {
	const { fetch } = server;
	const port = process.env.PORT;
	return { port, fetch };
};

export default createApp();
