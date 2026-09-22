import { betterAuth } from "better-auth";
import { admin, organization } from "better-auth/plugins";

import { Pool } from "pg";

import invariant from 'tiny-invariant';

invariant(process.env.DATABASE_URL)
invariant(process.env.BETTER_AUTH_URL)
invariant(process.env.BETTER_AUTH_SECRET)

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
		admin({
			schema: {
				user: {
					modelName: "iam_users",
					fields: {
						banExpires: "ban_expires",
						banReason: "ban_reason",
						impersonatedBy: "impersonated_by",
					},
				},
				session: {
					modelName: "iam_sessions",
					fields: {
						banExpires: "ban_expires",
						banReason: "ban_reason",
						impersonatedBy: "impersonated_by",
					},
				},
			},
		}),
		organization({
			schema: {
				organization: {
					modelName: "iam_organizations",
					fields: {
						createdAt: "created_at",
					},
				},
				organizationRole: {
					modelName: "iam_org_roles",
					fields: {
						organizationId: "organization_id",
            createdAt: "created_at",
            updatedAt: "updated_at",
					},
				},
				member: {
					modelName: "iam_org_members",
					fields: {
						userId: "user_id",
            organizationId: "organization_id",
            createdAt: "created_at",
					},
				},
				invitation: {
					modelName: "iam_org_invitations",
					fields: {
						inviterId: "inviter_id",
            organizationId: "organization_id",
            createdAt: "created_at",
            expiresAt: "expires_at",
					},
				},
				session: {
					fields: {
						activeOrganizationId: "active_organization_id",
					},
				},
			},
		}),
	],

	user: {
		modelName: "iam_users",
		fields: {
			createdAt: "created_at",
			updatedAt: "updated_at",
			emailVerified: "email_verified",
		},
	},
	session: {
		modelName: "iam_sessions",
		fields: {
			userId: "user_id",
      expiresAt: "expires_at",
      ipAddress: "ip_address",
      userAgent: "user_agent",
      createdAt: "created_at",
      updatedAt: "updated_at",
		},
	},
	verification: {
		modelName: "iam_verifications",
		fields: {
			expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
		},
	},
	account: {
		modelName: "iam_accounts",
		fields: {
			userId: "user_id",
			idToken: "id_token",
      accountId: "account_id",
      providerId: "provider_id",
      accessToken: "access_token",
      refreshToken: "refresh_token",
      accessTokenExpiresAt: "access_token_expires_at",
      refreshTokenExpiresAt: "refresh_token_expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
		},
	},

	advanced: {},
});
