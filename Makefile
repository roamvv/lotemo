.PHONY: run.dev
run.dev:
	@pnpm dev
run.build:
	@pnpm build

.PHONY: pg.migrate
pg.migrate:
	@bun ./node_modules/typeorm/cli.js migration:generate ./db/migrations/migrations -d ./db/pg.ts
	@bun ./node_modules/typeorm/cli.js migration:run -d ./db/pg.ts	