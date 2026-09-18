import { z } from "@hono/zod-openapi";

/**
 * Shared query schema for paginated list endpoints.
 * Usage: `paginationQuery.extend({ city: z.string().optional() })`
 */
export const paginationQuery = z.object({
	page: z.coerce.number().int().min(1).default(1),
	perPage: z.coerce.number().int().min(1).max(100).default(20),
});

export type Pagination = z.infer<typeof paginationQuery>;

/** Converts a 1-indexed page/perPage pair into a TypeORM `skip`/`take` pair. */
export const toSkipTake = ({ page, perPage }: Pagination) => ({
	skip: (page - 1) * perPage,
	take: perPage,
});

/** Shape returned by every paginated list endpoint. */
export const paginatedResponseSchema = (itemSchema: z.ZodTypeAny) =>
	z.object({
		data: z.array(itemSchema),
		page: z.number(),
		perPage: z.number(),
		total: z.number(),
	});

export const paginatedResponse = <T>(
	data: T[],
	pagination: Pagination,
	total = data.length,
) => ({
	data,
	page: pagination.page,
	perPage: pagination.perPage,
	total,
});
