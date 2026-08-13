import { boolean, varchar } from 'drizzle-orm/pg-core';
import { importerSchema } from './pg-schema';
import { timestamp } from 'drizzle-orm/pg-core';
import { jsonb } from 'drizzle-orm/pg-core';
import {
  AdjudicatorImport,
  AdjudicatorImportResult,
  AdjudicatorImportSessionFailedDetail,
  AdjudicatorUpdateNecessity,
  CellValue,
  ImportOrigin,
  SerializedAdjudicatorDuplicationStatus,
  SerializedTeamDuplicationStatus,
  TeamImport,
  TeamImportResult,
  TeamImportSessionFailedDetail,
  TeamUpdateNecessity,
} from '@importer/domain/values';
import { integer } from 'drizzle-orm/pg-core';
import { primaryKey } from 'drizzle-orm/pg-core';

export const teamImportSessionStatusEnum = importerSchema.enum(
  'team_import_session_status',
  ['incomplete', 'missing-entities', 'new-teams', 'success'],
);

export const adjudicatorImportSessionStatusEnum = importerSchema.enum(
  'adjudicator_import_session_status',
  ['incomplete', 'missing-entities', 'new-adjudicators', 'success'],
);

export const teamImportSessionTable = importerSchema.table(
  'team_import_session',
  {
    sessionId: varchar().primaryKey(),
    tournamentId: varchar().notNull(),
    origin: jsonb().$type<ImportOrigin>().notNull(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),
    status: teamImportSessionStatusEnum().notNull(),
    headers: jsonb().$type<(string | null)[]>().notNull(),
    missingInstitutions: varchar().array().notNull(),
    missingBreakCategories: varchar().array().notNull(),
    missingSpeakerCategories: varchar().array().notNull(),
    errorDetail: jsonb().$type<TeamImportSessionFailedDetail>(),
  },
);

export const importTeamRowTable = importerSchema.table(
  'import_team_row',
  {
    sessionId: varchar()
      .notNull()
      .references(() => teamImportSessionTable.sessionId, {
        onDelete: 'cascade',
      }),
    seq: integer().notNull(),
    raw: jsonb().$type<CellValue[]>().notNull(),
    success: boolean().notNull(),
    error: varchar(),
    parsed: jsonb().$type<TeamImport>(),
    matched: integer(),
    updateNecessity: jsonb().$type<TeamUpdateNecessity>(),
    duplication: jsonb().$type<SerializedTeamDuplicationStatus>(),
    doImport: boolean(),
    importResult: jsonb().$type<TeamImportResult>(),
  },
  (table) => [
    primaryKey({
      columns: [table.sessionId, table.seq],
    }),
  ],
);

export const adjudicatorImportSessionTable = importerSchema.table(
  'adjudicator_import_session',
  {
    sessionId: varchar().primaryKey(),
    tournamentId: varchar().notNull(),
    origin: jsonb().$type<ImportOrigin>().notNull(),
    status: adjudicatorImportSessionStatusEnum().notNull(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),
    headers: jsonb().$type<(string | null)[]>().notNull(),
    missingInstitutions: varchar().array().notNull(),
    errorDetail: jsonb().$type<AdjudicatorImportSessionFailedDetail>(),
  },
);

export const importAdjudicatorRowTable = importerSchema.table(
  'import_adjudicator_row',
  {
    sessionId: varchar()
      .notNull()
      .references(() => adjudicatorImportSessionTable.sessionId, {
        onDelete: 'cascade',
      }),
    seq: integer().notNull(),
    raw: jsonb().$type<CellValue[]>().notNull(),
    success: boolean().notNull(),
    error: varchar(),
    parsed: jsonb().$type<AdjudicatorImport>(),
    matched: integer(),
    updateNecessity: jsonb().$type<AdjudicatorUpdateNecessity>(),
    duplication: jsonb().$type<SerializedAdjudicatorDuplicationStatus>(),
    doImport: boolean(),
    importSuccess: boolean(),
    importResult: jsonb().$type<AdjudicatorImportResult>(),
  },
  (table) => [
    primaryKey({
      columns: [table.sessionId, table.seq],
    }),
  ],
);
