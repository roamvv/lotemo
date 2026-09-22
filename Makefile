%:
	@:

.PHONY: run.dev
run.dev:
	@pnpm dev
run.build:
	@pnpm build

.PHONY: pg.migrate pg.gen pg.create pg.run pg.revert
pg.migrate:
	$(MAKE) pg.gen
	$(MAKE) pg.run

pg.gen:
	@bun ./node_modules/typeorm/cli.js migration:generate ./db/migrations/migrations -d ./db/pg.ts

pg.create:
	@bun ./node_modules/typeorm/cli.js migration:create ./db/migrations/migrations

pg.run:
	@bun ./node_modules/typeorm/cli.js migration:run -d ./db/pg.ts

pg.revert:
	@bun ./node_modules/typeorm/cli.js migration:revert -d ./db/pg.ts

.PHONY: seed.create seed.run
seed.create:
	@bun ./node_modules/typeorm-extension/bin/cli.mjs seed create -r ./db/seeds/ -d ./db/pg.ts $(filter-out $@,$(MAKECMDGOALS))
seed.run:
	@bun ./node_modules/typeorm-extension/bin/cli.mjs seed run -r ./db/seeds/ -d ./db/pg.ts $(filter-out $@,$(MAKECMDGOALS))	

.PHONY: zip
zip:
	@git archive --format=zip --output=./$(shell git rev-parse --abbrev-ref HEAD).zip HEAD