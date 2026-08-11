import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: [
    './src/importer/infrastructure/persistence/pg-schema.ts',
    './src/importer/infrastructure/persistence/schema.ts',
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_IMPORTER ?? process.env.DATABASE_URL!,
  },
  introspect: {
    casing: 'camel',
  },
  casing: 'snake_case',
  schemaFilter: ['importer'],
  out: './drizzle/importer',
});
