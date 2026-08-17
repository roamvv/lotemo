import { Hono } from 'hono'
import { auth } from '.auth/server'

export const server = new Hono({ strict: true })

// better-auth handlers
server.on(['POST', 'GET'], '/api/v1/auth/*', c => auth.handler(c.req.raw))