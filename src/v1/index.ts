
import { Hono } from 'hono'

import auth from './auth'
import hellov1 from './hellov1'

export const v1 = new Hono({ strict: true }).basePath('/api/v1')

v1.route('/', auth)
v1.route('/', hellov1)

export default v1
