import { pgSchema } from 'drizzle-orm/pg-core';

export const schemaName = 'shared';
export const sharedSchema = pgSchema(schemaName);
