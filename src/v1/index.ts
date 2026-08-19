
import { auth } from '@/auth'
import { Hono } from 'hono'

import hellov1 from './hellov1'

export const v1 = new Hono({ strict: true }).basePath('/api/v1')

v1.on(['POST', 'GET'], '/auth/*', c => auth.handler(c.req.raw))

v1.route('/', hellov1)

export default v1
