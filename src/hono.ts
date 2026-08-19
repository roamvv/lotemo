import { Hono } from 'hono'

import appv1 from './v1'

export const server = new Hono({ strict: true })

server.route('/', appv1)