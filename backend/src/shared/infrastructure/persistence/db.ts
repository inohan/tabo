import { Kysely } from 'kysely';
import { Kyselify } from 'drizzle-orm/kysely';
import * as s from './schema';

export interface DbSchema {
  tournament: Kyselify<typeof s.tournamentTable>;
  institution: Kyselify<typeof s.institutionTable>;
  team: Kyselify<typeof s.teamTable>;
  speaker: Kyselify<typeof s.speakerTable>;
  breakCategory: Kyselify<typeof s.breakCategoryTable>;
  speakerCategory: Kyselify<typeof s.speakerCategoryTable>;
  adjudicator: Kyselify<typeof s.adjudicatorTable>;
  venue: Kyselify<typeof s.venueTable>;
  round: Kyselify<typeof s.roundTable>;
}

// export const db = new Kysely<DbSchema>({
//   dialect: new PostgresDialect({
//     pool: new Pool({ connectionString: process.env.DATABASE_URL, max: 8 }),
//   }),
//   plugins: [new CamelCasePlugin()],
// }).withSchema('shared');

export type Db = Kysely<DbSchema>;
