FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun build ./src/v1/app/index.ts --outdir ./dist --target bun --sourcemap

FROM oven/bun:1-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/db ./db
COPY --from=build /app/package.json ./package.json

EXPOSE 5000
CMD ["bun", "run", "./dist/index.js"]