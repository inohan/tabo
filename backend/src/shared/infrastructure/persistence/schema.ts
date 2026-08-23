import {
  varchar,
  integer,
  primaryKey,
  timestamp,
  boolean,
  numeric,
} from 'drizzle-orm/pg-core';
import {
  RoundDrawStatus,
  RoundDrawType,
  RoundMotionsStatus,
  RoundStage,
} from 'src/shared/domain';
import { sharedSchema } from './pg-schema';

export const tournamentTable = sharedSchema.table('tournament', {
  tournamentId: varchar().primaryKey(),
  baseUrl: varchar().notNull(),
  id: integer().notNull(),
  slug: varchar().notNull(),
  name: varchar().notNull(),
  shortName: varchar().notNull(),
  token: varchar().notNull(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp(),
});

export const fileTable = sharedSchema.table(
  'file',
  {
    tournamentId: varchar().notNull(),
    id: varchar().notNull(),
    path: varchar().notNull(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

export const institutionTable = sharedSchema.table(
  'institution',
  {
    tournamentId: varchar().notNull(),
    id: integer().notNull(),
    name: varchar().notNull(),
    code: varchar().notNull(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

export const teamTable = sharedSchema.table(
  'team',
  {
    tournamentId: varchar().notNull(),
    id: integer().notNull(),
    reference: varchar().notNull(),
    shortReference: varchar().notNull(),
    institutionId: integer(),
    institutionConflicts: integer().array().notNull(),
    breakCategories: integer().array().notNull(),
    emoji: varchar({ length: 1 }),
    codeName: varchar().notNull(),
    useInstitutionPrefix: boolean().notNull(),
    shortName: varchar().notNull(),
    longName: varchar().notNull(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

export const speakerTable = sharedSchema.table(
  'speaker',
  {
    tournamentId: varchar().notNull(),
    id: integer().notNull(),
    name: varchar().notNull(),
    institutionId: integer(), // TODO: isolate as different table
    teamId: integer().notNull(),
    categories: integer().array().notNull(),
    anonymous: boolean().notNull(),
    email: varchar(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

export const breakCategoryTable = sharedSchema.table(
  'break_category',
  {
    tournamentId: varchar().notNull(),
    id: integer().notNull(),
    name: varchar().notNull(),
    slug: varchar().notNull(),
    seq: integer().notNull(),
    breakSize: integer().notNull(),
    reserveSize: integer().notNull(),
    isGeneral: boolean().notNull(),
    priority: integer().notNull(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

export const speakerCategoryTable = sharedSchema.table(
  'speaker_category',
  {
    tournamentId: varchar().notNull(),
    id: integer().notNull(),
    name: varchar().notNull(),
    slug: varchar().notNull(),
    seq: integer().notNull(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

export const adjudicatorTable = sharedSchema.table(
  'adjudicator',
  {
    tournamentId: varchar().notNull(),
    id: integer().notNull(),
    name: varchar().notNull(),
    email: varchar(),
    institutionId: integer(), // Hard-code name for set null constraint
    breaking: boolean().notNull(),
    independent: boolean().notNull(),
    adjCore: boolean().notNull(),
    institutionConflicts: integer().array().notNull(),
    teamConflicts: integer().array().notNull(),
    adjudicatorConflicts: integer().array().notNull(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

export const venueTable = sharedSchema.table(
  'venue',
  {
    tournamentId: varchar().notNull(),
    id: integer().notNull(),
    name: varchar().notNull(),
    displayName: varchar().notNull(),
    priority: integer().notNull(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

export const roundStagePgEnum = sharedSchema.enum(
  'round_stage',
  RoundStage._keys,
);

export const roundDrawTypePgEnum = sharedSchema.enum(
  'round_draw_type',
  RoundDrawType._keys,
);
export const roundDrawStatusPgEnum = sharedSchema.enum(
  'round_draw_status',
  RoundDrawStatus._keys,
);
export const roundMotionsStatusPgEnum = sharedSchema.enum(
  'round_motions_status',
  RoundMotionsStatus._keys,
);

export const roundTable = sharedSchema.table(
  'round',
  {
    tournamentId: varchar().notNull(),
    id: integer().notNull(),
    breakCategoryId: integer(),
    displayName: varchar().notNull(),
    startsAt: timestamp(),
    motionsReleased: boolean().notNull(),
    seq: integer().notNull(),
    completed: boolean().notNull(),
    name: varchar().notNull(),
    abbreviation: varchar().notNull(),
    stage: roundStagePgEnum().notNull(),
    drawType: roundDrawTypePgEnum().notNull(),
    drawStatus: roundDrawStatusPgEnum().notNull(),
    feedbackWeight: numeric().notNull(),
    silent: boolean().notNull(),
    motionsStatus: roundMotionsStatusPgEnum().notNull(),
    weight: numeric().notNull(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);
