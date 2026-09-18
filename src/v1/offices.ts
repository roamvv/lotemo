import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

// TODO: wire handlers to db/entities/Office.ts via a repository layer

const app = new OpenAPIHono()

const agencyOfficeParams = z.object({
  agencyId: z.coerce.number(),
})

const agencyOfficeIdParams = z.object({
  agencyId: z.coerce.number(),
  id: z.coerce.number(),
})

app.openapi(
  createRoute({
    method: 'get',
    path: '/agencies/{agencyId}/offices',
    request: { params: agencyOfficeParams },
    responses: {
      200: { content: { 'application/json': { schema: z.array(z.any()) } }, description: 'Branch offices belonging to this agency' },
    },
  }),
  c => c.json([])
)

app.openapi(
  createRoute({
    method: 'post',
    path: '/agencies/{agencyId}/offices',
    request: { params: agencyOfficeParams, body: { content: { 'application/json': { schema: z.any() } } } },
    responses: {
      201: { content: { 'application/json': { schema: z.any() } }, description: 'Created office' },
    },
  }),
  c => c.json({ message: 'Not implemented' }, 501)
)

app.openapi(
  createRoute({
    method: 'patch',
    path: '/agencies/{agencyId}/offices/{id}',
    request: { params: agencyOfficeIdParams, body: { content: { 'application/json': { schema: z.any() } } } },
    responses: {
      200: { content: { 'application/json': { schema: z.any() } }, description: 'Updated office' },
    },
  }),
  c => c.json({ message: 'Not implemented' }, 501)
)

app.openapi(
  createRoute({
    method: 'delete',
    path: '/agencies/{agencyId}/offices/{id}',
    request: { params: agencyOfficeIdParams },
    responses: {
      204: { description: 'Office deleted' },
    },
  }),
  c => c.body(null, 204)
)

app.openapi(
  createRoute({
    method: 'get',
    path: '/offices/{slug}',
    request: { params: z.object({ slug: z.string() }) },
    responses: {
      200: { content: { 'application/json': { schema: z.any() } }, description: 'Public office profile' },
      404: { content: { 'application/json': { schema: z.object({ message: z.string() }) } }, description: 'Office not found' },
    },
  }),
  c => c.json({ message: 'Not implemented' }, 404)
)

app.openapi(
  createRoute({
    method: 'get',
    path: '/properties/{propertyId}/nearest-office',
    request: { params: z.object({ propertyId: z.coerce.number() }) },
    responses: {
      200: { content: { 'application/json': { schema: z.any() } }, description: 'Closest staffed office to a property, by gcsId distance' },
    },
  }),
  c => c.json({ message: 'Not implemented' }, 404)
)

export default app
