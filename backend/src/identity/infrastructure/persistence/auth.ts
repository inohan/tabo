import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './drizzle';
import { organization } from 'better-auth/plugins/organization';
import { openAPI } from 'better-auth/plugins';
import { ac, owner, admin, member } from './permissions';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      accessType: 'offline',
      prompt: 'select_account',
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      disableSignUp: true,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: true,
    },
  },
  plugins: [
    organization({
      ac,
      roles: {
        owner,
        admin,
        member,
      },
      schema: {
        organization: {
          additionalFields: {
            tournamentId: {
              type: 'string',
              input: false,
              required: true,
            },
          },
        },
      },
    }),
    openAPI(),
  ],
  basePath: '/auth',
  disabledPaths: [],
});
