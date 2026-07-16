import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: [
    './src/shared/infrastructure/persistence/pg-schema.ts',
    './src/shared/infrastructure/persistence/schema.ts',
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_SHARED ?? process.env.DATABASE_URL!,
  },
  introspect: {
    casing: 'camel',
  },
  casing: 'snake_case',
  schemaFilter: ['shared'],
  out: './drizzle/shared',
});
