import { boolean, varchar } from 'drizzle-orm/pg-core';
import { importerSchema } from './pg-schema';
import { timestamp } from 'drizzle-orm/pg-core';
import { jsonb } from 'drizzle-orm/pg-core';
import {
  AdjudicatorImport,
  CellValue,
  ImportOrigin,
  SerializedTeamDuplicationStatus,
  TeamImport,
  TeamUpdateNecessity,
} from '@importer/domain/values';
import { integer } from 'drizzle-orm/pg-core';
import { primaryKey } from 'drizzle-orm/pg-core';

export const importSessionTypeEnum = importerSchema.enum(
  'import_session_type',
  ['team', 'adjudicator'],
);

export const importRowClassificationEnum = importerSchema.enum(
  'import_row_classification',
  ['existing', 'update', 'new'],
);

export const importSessionTable = importerSchema.table('import_session', {
  sessionId: varchar().primaryKey(),
  tournamentId: varchar().notNull(),
  type: importSessionTypeEnum().notNull(),
  origin: jsonb().$type<ImportOrigin>().notNull(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull(),
  headers: jsonb().$type<(string | null)[]>().notNull(),
});

export const importTeamRowTable = importerSchema.table(
  'import_team_row',
  {
    sessionId: varchar()
      .notNull()
      .references(() => importSessionTable.sessionId, { onDelete: 'cascade' }),
    seq: integer().notNull(),
    raw: jsonb().$type<CellValue[]>().notNull(),
    success: boolean().notNull(),
    error: varchar(),
    parsed: jsonb().$type<TeamImport>(),
    matched: integer(),
    updateNecessity: jsonb().$type<TeamUpdateNecessity>(),
    duplication: jsonb().$type<SerializedTeamDuplicationStatus>(),
    doImport: boolean(),
  },
  (table) => [
    primaryKey({
      columns: [table.sessionId, table.seq],
    }),
  ],
);

export const importAdjudicatorRowTable = importerSchema.table(
  'import_adjudicator_row',
  {
    sessionId: varchar()
      .notNull()
      .references(() => importSessionTable.sessionId, { onDelete: 'cascade' }),
    seq: integer().notNull(),
    raw: jsonb().$type<CellValue[]>().notNull(),
    success: boolean().notNull(),
    error: varchar(),
    parsed: jsonb().$type<AdjudicatorImport>(),
    classification: importRowClassificationEnum(),
  },
  (table) => [
    primaryKey({
      columns: [table.sessionId, table.seq],
    }),
  ],
);
