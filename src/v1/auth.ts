
import { auth } from '@/auth'
import { Hono } from 'hono'

const app = new Hono({ strict: true })

app.on(['POST', 'GET'], '/auth/*', c => auth.handler(c.req.raw))


export default app