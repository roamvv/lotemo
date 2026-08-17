import { betterAuth } from 'better-auth'
import { organization } from 'better-auth/plugins'

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [
    organization(),
  ],
})