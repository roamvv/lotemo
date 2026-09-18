
import { Hono } from 'hono'

import auth from './auth'
import hellov1 from './hellov1'
import offices from './offices'
import pointsOfInterest from './points-of-interest'
import projects from './projects'

export const v1 = new Hono({ strict: true }).basePath('/api/v1')

v1.route('/', auth)
v1.route('/', hellov1)
v1.route('/', projects)
v1.route('/', offices)
v1.route('/', pointsOfInterest)

export default v1
