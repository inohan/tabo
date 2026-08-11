import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export const createTestDb = <T>(schema: string): Kysely<T> =>
  new Kysely<T>({
    dialect: new PostgresDialect({
      pool: new Pool({ connectionString: process.env.DATABASE_URL, max: 4 }),
    }),
    plugins: [new CamelCasePlugin()],
  }).withSchema(schema);
