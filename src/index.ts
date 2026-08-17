
import { server } from './hono'

const createApp = () => {
  const { fetch } = server
  const port = process.env.PORT
  return { port, fetch }
}

export default createApp()