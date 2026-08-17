.PHONY: buf.up buf.lint buf.gen

buf.up:
	@pnpm buf dep update

buf.lint:
	@pnpm buf lint

buf.gen:
	@pnpm buf generate