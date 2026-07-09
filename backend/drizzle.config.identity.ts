import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: [
    './src/identity/infrastructure/persistence/schema.ts',
    './src/identity/infrastructure/persistence/auth-schema.ts',
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_AUTH ?? process.env.DATABASE_URL!,
  },
  introspect: {
    casing: 'camel',
  },
  casing: 'snake_case',
  schemaFilter: ['identity'],
  out: './drizzle/identity',
});
