import { betterAuth } from 'better-auth'
import { admin, organization } from 'better-auth/plugins'

import { Pool } from 'pg'

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin(),
    organization({
      schema: {
        organization: {
          modelName: 'iam_organizations',
        },
        organizationRole: {
          modelName: 'iam_org_roles',
        },
        member: {
          modelName: 'iam_org_members',
        },
        invitation: {
          modelName: 'iam_org_invitations',
        },
      },
    }),
  ],

  user: {
    modelName: 'iam_users',
  },
  session: {
    modelName: 'iam_sessions',
  },
  verification: {
    modelName: 'iam_verifications',
  },
  account: {
    modelName: 'iam_accounts',
  },

  advanced: {
    
  },
})