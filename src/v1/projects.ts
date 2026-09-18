import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

// TODO: wire handlers to db/entities/Project.ts and ProjectUnitType.ts via a repository layer

const app = new OpenAPIHono()

const projectParams = z.object({
  slug: z.string(),
})

const projectIdParams = z.object({
  id: z.coerce.number(),
})

const unitTypeParams = z.object({
  projectId: z.coerce.number(),
  id: z.coerce.number(),
})

const projectListQuery = z.object({
  city: z.string().optional(),
  projectType: z.string().optional(),
  status: z.string().optional(),
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(20),
})

app.openapi(
  createRoute({
    method: 'get',
    path: '/projects',
    request: { query: projectListQuery },
    responses: {
      200: {
        content: { 'application/json': { schema: z.object({ data: z.array(z.any()), page: z.number(), perPage: z.number(), total: z.number() }) } },
        description: 'Paginated list of projects/developments',
      },
    },
  }),
  c => c.json({ data: [], page: c.req.valid('query').page, perPage: c.req.valid('query').perPage, total: 0 })
)

app.openapi(
  createRoute({
    method: 'get',
    path: '/projects/{slug}',
    request: { params: projectParams },
    responses: {
      200: { content: { 'application/json': { schema: z.any() } }, description: 'Project detail, including aggregated unit stats' },
      404: { content: { 'application/json': { schema: z.object({ message: z.string() }) } }, description: 'Project not found' },
    },
  }),
  c => c.json({ message: 'Not implemented' }, 404)
)

app.openapi(
  createRoute({
    method: 'post',
    path: '/projects',
    request: { body: { content: { 'application/json': { schema: z.any() } } } },
    responses: {
      201: { content: { 'application/json': { schema: z.any() } }, description: 'Created project' },
    },
  }),
  c => c.json({ message: 'Not implemented' }, 501)
)

app.openapi(
  createRoute({
    method: 'patch',
    path: '/projects/{id}',
    request: { params: projectIdParams, body: { content: { 'application/json': { schema: z.any() } } } },
    responses: {
      200: { content: { 'application/json': { schema: z.any() } }, description: 'Updated project' },
    },
  }),
  c => c.json({ message: 'Not implemented' }, 501)
)

app.openapi(
  createRoute({
    method: 'get',
    path: '/projects/{projectId}/unit-types',
    request: { params: z.object({ projectId: z.coerce.number() }) },
    responses: {
      200: { content: { 'application/json': { schema: z.array(z.any()) } }, description: 'Unit-type facets for a project (Studio, 1BR, 2BR…)' },
    },
  }),
  c => c.json([])
)

app.openapi(
  createRoute({
    method: 'post',
    path: '/projects/{projectId}/unit-types',
    request: { params: z.object({ projectId: z.coerce.number() }), body: { content: { 'application/json': { schema: z.any() } } } },
    responses: {
      201: { content: { 'application/json': { schema: z.any() } }, description: 'Created unit type' },
    },
  }),
  c => c.json({ message: 'Not implemented' }, 501)
)

app.openapi(
  createRoute({
    method: 'patch',
    path: '/projects/{projectId}/unit-types/{id}',
    request: { params: unitTypeParams, body: { content: { 'application/json': { schema: z.any() } } } },
    responses: {
      200: { content: { 'application/json': { schema: z.any() } }, description: 'Updated unit type' },
    },
  }),
  c => c.json({ message: 'Not implemented' }, 501)
)

app.openapi(
  createRoute({
    method: 'delete',
    path: '/projects/{projectId}/unit-types/{id}',
    request: { params: unitTypeParams },
    responses: {
      204: { description: 'Unit type deleted' },
    },
  }),
  c => c.body(null, 204)
)

export default app
