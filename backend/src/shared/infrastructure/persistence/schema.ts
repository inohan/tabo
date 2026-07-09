import {
  varchar,
  integer,
  primaryKey,
  timestamp,
  boolean,
  foreignKey,
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

export const institutionTable = sharedSchema.table(
  'institution',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.tournamentId, { onDelete: 'cascade' }),
    id: integer().notNull(),
    name: varchar().notNull(),
    code: varchar().notNull(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

// TODO: Change on delete of institution to cascade only to institutionId
export const teamTable = sharedSchema.table(
  'team',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.tournamentId, { onDelete: 'cascade' }),
    id: integer().notNull(),
    reference: varchar().notNull(),
    shortReference: varchar().notNull(),
    institutionId: integer(),
    emoji: varchar({ length: 1 }),
    codeName: varchar().notNull(),
    useInstitutionPrefix: boolean().notNull(),
    shortName: varchar().notNull(),
    longName: varchar().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.tournamentId, table.id] }),
    foreignKey({
      columns: [table.tournamentId, table.institutionId],
      foreignColumns: [institutionTable.tournamentId, institutionTable.id],
      name: 'team_institution_fk',
      // @ts-expect-error Workaround for https://github.com/drizzle-team/drizzle-orm/issues/5684
    }).onDelete(`set null (institution_id)`),
  ],
);

export const teamInstitutionConflictTable = sharedSchema.table(
  'team_institution_conflict',
  {
    tournamentId: varchar().notNull(),
    teamId: integer().notNull(),
    institutionId: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.tournamentId, table.teamId, table.institutionId],
    }),
    foreignKey({
      columns: [table.tournamentId, table.teamId],
      foreignColumns: [teamTable.tournamentId, teamTable.id],
      name: 'team_institution_conflict_team_fk',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.institutionId],
      foreignColumns: [institutionTable.tournamentId, institutionTable.id],
      name: 'team_institution_conflict_institution_fk',
    }).onDelete('cascade'),
  ],
);

export const teamBreakCategoryTable = sharedSchema.table(
  'team_break_category',
  {
    tournamentId: varchar().notNull(),
    teamId: integer().notNull(),
    breakCategoryId: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.tournamentId, table.teamId, table.breakCategoryId],
    }),
    foreignKey({
      columns: [table.tournamentId, table.teamId],
      foreignColumns: [teamTable.tournamentId, teamTable.id],
      name: 'team_bc_team_fk',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.breakCategoryId],
      foreignColumns: [breakCategoryTable.tournamentId, breakCategoryTable.id],
      name: 'team_bc_bc_fk',
    }).onDelete('cascade'),
  ],
);

// TODO: Change on delete of institution to cascade only to institutionId
export const speakerTable = sharedSchema.table(
  'speaker',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.tournamentId, { onDelete: 'cascade' }),
    id: integer().notNull(),
    name: varchar().notNull(),
    institutionId: integer(),
    teamId: integer().notNull(),
    anonymous: boolean().notNull(),
    email: varchar(),
  },
  (table) => [
    primaryKey({ columns: [table.tournamentId, table.id] }),
    foreignKey({
      columns: [table.tournamentId, table.teamId],
      foreignColumns: [teamTable.tournamentId, teamTable.id],
      name: 'speaker_team_fk',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.institutionId],
      foreignColumns: [institutionTable.tournamentId, institutionTable.id],
      name: 'speaker_institution_fk',
      // @ts-expect-error Workaround for https://github.com/drizzle-team/drizzle-orm/issues/5684
    }).onDelete(`set null (institution_id)`),
  ],
);

export const speakerSpeakerCategoryTable = sharedSchema.table(
  'speaker_speaker_category',
  {
    tournamentId: varchar().notNull(),
    speakerId: integer().notNull(),
    speakerCategoryId: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.tournamentId, table.speakerId, table.speakerCategoryId],
    }),
    foreignKey({
      columns: [table.tournamentId, table.speakerId],
      foreignColumns: [speakerTable.tournamentId, speakerTable.id],
      name: 'speaker_sc_speaker_fk',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.speakerCategoryId],
      foreignColumns: [
        speakerCategoryTable.tournamentId,
        speakerCategoryTable.id,
      ],
      name: 'speaker_sc_sc_fk',
    }).onDelete('cascade'),
  ],
);

export const breakCategoryTable = sharedSchema.table(
  'break_category',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.tournamentId, { onDelete: 'cascade' }),
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
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.tournamentId, { onDelete: 'cascade' }),
    id: integer().notNull(),
    name: varchar().notNull(),
    slug: varchar().notNull(),
    seq: integer().notNull(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

// TODO: Change on delete of institution to cascade only to institutionId via migration
export const adjudicatorTable = sharedSchema.table(
  'adjudicator',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.tournamentId, { onDelete: 'cascade' }),
    id: integer().notNull(),
    name: varchar().notNull(),
    institutionId: integer(), // Hard-code name for set null constraint
    breaking: boolean().notNull(),
    independent: boolean().notNull(),
    adjCore: boolean().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.tournamentId, table.id] }),
    foreignKey({
      columns: [table.tournamentId, table.institutionId],
      foreignColumns: [institutionTable.tournamentId, institutionTable.id],
      name: 'adjudicator_institution_fk',
      // @ts-expect-error Workaround for https://github.com/drizzle-team/drizzle-orm/issues/5684
    }).onDelete(`set null (institution_id)`),
  ],
);

export const adjudicatorInstitutionConflictTable = sharedSchema.table(
  'adjudicator_institution_conflict',
  {
    tournamentId: varchar().notNull(),
    adjudicatorId: integer().notNull(),
    institutionId: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.tournamentId, table.adjudicatorId, table.institutionId],
    }),
    foreignKey({
      columns: [table.tournamentId, table.adjudicatorId],
      foreignColumns: [adjudicatorTable.tournamentId, adjudicatorTable.id],
      name: 'adj_inst_conflict_adj_fk',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.institutionId],
      foreignColumns: [institutionTable.tournamentId, institutionTable.id],
      name: 'adj_inst_conflict_inst_fk',
    }).onDelete('cascade'),
  ],
);

export const adjudicatorAdjudicatorConflictTable = sharedSchema.table(
  'adjudicator_adjudicator_conflict',
  {
    tournamentId: varchar().notNull(),
    adjudicatorAId: integer().notNull(),
    adjudicatorBId: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.tournamentId, table.adjudicatorAId, table.adjudicatorBId],
    }),
    foreignKey({
      columns: [table.tournamentId, table.adjudicatorAId],
      foreignColumns: [adjudicatorTable.tournamentId, adjudicatorTable.id],
      name: 'adj_adj_conflict_a_fk',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.adjudicatorBId],
      foreignColumns: [adjudicatorTable.tournamentId, adjudicatorTable.id],
      name: 'adj_adj_conflict_b_fk',
    }).onDelete('cascade'),
  ],
);

export const adjudicatorTeamConflictTable = sharedSchema.table(
  'adjudicator_team_conflict',
  {
    tournamentId: varchar().notNull(),
    adjudicatorId: integer().notNull(),
    teamId: integer().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.tournamentId, table.adjudicatorId, table.teamId],
    }),
    foreignKey({
      columns: [table.tournamentId, table.adjudicatorId],
      foreignColumns: [adjudicatorTable.tournamentId, adjudicatorTable.id],
      name: 'adj_team_conflict_adj_fk',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.teamId],
      foreignColumns: [teamTable.tournamentId, teamTable.id],
      name: 'adj_team_conflict_team_fk',
    }).onDelete('cascade'),
  ],
);

export const venueTable = sharedSchema.table(
  'venue',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.tournamentId, { onDelete: 'cascade' }),
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
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.tournamentId, { onDelete: 'cascade' }),
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
  (table) => [
    primaryKey({ columns: [table.tournamentId, table.id] }),
    foreignKey({
      columns: [table.tournamentId, table.breakCategoryId],
      foreignColumns: [breakCategoryTable.tournamentId, breakCategoryTable.id],
      name: 'round_break_category_fk',
    }).onDelete('cascade'),
  ],
);
