// db.ts
import { drizzle } from 'drizzle-orm/node-postgres';
// import * as schema from './schema';
import * as authSchema from './auth-schema';
import { Pool } from 'pg';

export const db = drizzle(
  new Pool({
    connectionString:
      process.env.DATABASE_URL_IDENTITY ?? process.env.DATABASE_URL!,
    max: 8,
  }),
  { schema: { ...authSchema } },
);
