declare namespace NodeJS {
	interface ProcessEnv {
		PORT?: string;
		BETTER_AUTH_URL: string;
		BETTER_AUTH_SECRET: string;
		DATABASE_URL: string;
		S3_REGION: string;
		S3_ENDPOINT: string;
		S3_ACCESS_KEY: string;
		S3_SECRET_ACCESS_KEY: string;
		RESEND_API_KEY: string;
	}
}

declare namespace TotemoV1 {
	type HonoEnv = {
		Variables: {
			pgdb: typeof import(".db/pg").default;
			s3: typeof import("@/s3").default;
		};
	};
}
