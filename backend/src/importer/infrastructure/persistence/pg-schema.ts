import { pgSchema } from 'drizzle-orm/pg-core';

export const schemaName = 'importer';
export const importerSchema = pgSchema(schemaName);
