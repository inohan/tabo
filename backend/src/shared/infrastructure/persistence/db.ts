import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Kyselify } from 'drizzle-orm/kysely';
import { Pool } from 'pg';
import * as s from './schema';

interface DbSchema {
  tournament: Kyselify<typeof s.tournamentTable>;
  institution: Kyselify<typeof s.institutionTable>;
  team: Kyselify<typeof s.teamTable>;
  teamInstitutionConflict: Kyselify<typeof s.teamInstitutionConflictTable>;
  teamBreakCategory: Kyselify<typeof s.teamBreakCategoryTable>;
  speaker: Kyselify<typeof s.speakerTable>;
  speakerSpeakerCategory: Kyselify<typeof s.speakerSpeakerCategoryTable>;
  breakCategory: Kyselify<typeof s.breakCategoryTable>;
  speakerCategory: Kyselify<typeof s.speakerCategoryTable>;
  adjudicator: Kyselify<typeof s.adjudicatorTable>;
  adjudicatorInstitutionConflict: Kyselify<
    typeof s.adjudicatorInstitutionConflictTable
  >;
  adjudicatorAdjudicatorConflict: Kyselify<
    typeof s.adjudicatorAdjudicatorConflictTable
  >;
  adjudicatorTeamConflict: Kyselify<typeof s.adjudicatorTeamConflictTable>;
  venue: Kyselify<typeof s.venueTable>;
  round: Kyselify<typeof s.roundTable>;
}

export const db = new Kysely<DbSchema>({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env.DATABASE_URL, max: 8 }),
  }),
  plugins: [new CamelCasePlugin()],
});

export type Db = typeof db;
