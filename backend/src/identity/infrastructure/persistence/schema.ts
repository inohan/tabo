import { text, varchar } from 'drizzle-orm/pg-core';
import { organization } from './auth-schema';
import { primaryKey } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const tournament = pgTable(
  'tournament',
  {
    organizationId: text()
      .notNull()
      .references(() => organization.id),
    tournamentId: varchar().notNull().primaryKey(),
  },
  (table) => [
    primaryKey({ columns: [table.organizationId, table.tournamentId] }),
  ],
);
