import {
  pgTable,
  varchar,
  integer,
  primaryKey,
  timestamp,
  boolean,
  foreignKey,
  pgEnum,
  numeric,
} from 'drizzle-orm/pg-core';
import { getEnumValues } from 'src/lib/enum';
import {
  RoundDrawStatus,
  RoundDrawType,
  RoundMotionsStatus,
  RoundStage,
} from 'src/shared/domain';

export const tournamentTable = pgTable('tournament', {
  id: varchar().primaryKey(),
  baseUrl: varchar().notNull(),
  tabId: integer().notNull(),
  slug: varchar().notNull(),
  name: varchar().notNull(),
  shortName: varchar().notNull(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp(),
});

export const institutionTable = pgTable(
  'institution',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.id, { onDelete: 'cascade' }),
    id: integer().notNull(),
    name: varchar().notNull(),
    code: varchar().notNull(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

// TODO: Change on delete of institution to cascade only to institutionId
export const teamTable = pgTable(
  'team',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.id, { onDelete: 'cascade' }),
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
    }).onDelete('no action'),
  ],
);

export const teamInstitutionConflictTable = pgTable(
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
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.institutionId],
      foreignColumns: [institutionTable.tournamentId, institutionTable.id],
    }).onDelete('cascade'),
  ],
);

export const teamBreakCategoryTable = pgTable(
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
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.breakCategoryId],
      foreignColumns: [breakCategoryTable.tournamentId, breakCategoryTable.id],
    }).onDelete('cascade'),
  ],
);

// TODO: Change on delete of institution to cascade only to institutionId
export const speakerTable = pgTable(
  'speaker',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.id, { onDelete: 'cascade' }),
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
    }).onDelete('no action'),
  ],
);

export const speakerSpeakerCategoryTable = pgTable(
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
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.speakerCategoryId],
      foreignColumns: [
        speakerCategoryTable.tournamentId,
        speakerCategoryTable.id,
      ],
    }).onDelete('cascade'),
  ],
);

export const breakCategoryTable = pgTable(
  'break_category',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.id, { onDelete: 'cascade' }),
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

export const speakerCategoryTable = pgTable(
  'speaker_category',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.id, { onDelete: 'cascade' }),
    id: integer().notNull(),
    name: varchar().notNull(),
    slug: varchar().notNull(),
    seq: integer().notNull(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

// TODO: Change on delete of institution to cascade only to institutionId via migration
export const adjudicatorTable = pgTable(
  'adjudicator',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.id, { onDelete: 'cascade' }),
    id: integer().notNull(),
    name: varchar().notNull(),
    institutionId: integer(),
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
    }).onDelete('no action'),
  ],
);

export const adjudicatorInstitutionConflictTable = pgTable(
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
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.institutionId],
      foreignColumns: [institutionTable.tournamentId, institutionTable.id],
    }).onDelete('cascade'),
  ],
);

export const adjudicatorAdjudicatorConflictTable = pgTable(
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
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.adjudicatorBId],
      foreignColumns: [adjudicatorTable.tournamentId, adjudicatorTable.id],
    }).onDelete('cascade'),
  ],
);

export const adjudicatorTeamConflictTable = pgTable(
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
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.tournamentId, table.teamId],
      foreignColumns: [teamTable.tournamentId, teamTable.id],
    }).onDelete('cascade'),
  ],
);

export const venueTable = pgTable(
  'venue',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.id),
    id: integer().notNull(),
    name: varchar().notNull(),
    displayName: varchar().notNull(),
    priority: integer().notNull(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.id] })],
);

const roundStagePgEnum = pgEnum('round_stage', getEnumValues(RoundStage));
const roundDrawTypePgEnum = pgEnum(
  'round_draw_type',
  getEnumValues(RoundDrawType),
);
const roundDrawStatusPgEnum = pgEnum(
  'round_draw_status',
  getEnumValues(RoundDrawStatus),
);
const roundMotionsStatusPgEnum = pgEnum(
  'round_motions_status',
  getEnumValues(RoundMotionsStatus),
);

export const roundTable = pgTable(
  'round',
  {
    tournamentId: varchar()
      .notNull()
      .references(() => tournamentTable.id),
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
