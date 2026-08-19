%:
	@:

.PHONY: run.dev
run.dev:
	@pnpm dev
run.build:
	@pnpm build

.PHONY: pg.migrate
pg.migrate:
	@bun ./node_modules/typeorm/cli.js migration:generate ./db/migrations/migrations -d ./db/pg.ts
	@bun ./node_modules/typeorm/cli.js migration:run -d ./db/pg.ts

.PHONY: seed.create seed.run
seed.create:
	@bun ./node_modules/typeorm-extension/bin/cli.mjs seed create -r ./db/seeds/ -d ./db/pg.ts $(filter-out $@,$(MAKECMDGOALS))
seed.run:
	@bun ./node_modules/typeorm-extension/bin/cli.mjs seed run -r ./db/seeds/ -d ./db/pg.ts $(filter-out $@,$(MAKECMDGOALS))	