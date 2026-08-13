import { Kysely } from 'kysely';
import * as s from './schema';
import { Kyselify } from 'drizzle-orm/kysely';
export interface DbSchema {
  teamImportSession: Kyselify<typeof s.teamImportSessionTable>;
  importTeamRow: Kyselify<typeof s.importTeamRowTable>;
  adjudicatorImportSession: Kyselify<typeof s.adjudicatorImportSessionTable>;
  importAdjudicatorRow: Kyselify<typeof s.importAdjudicatorRowTable>;
}

export type Db = Kysely<DbSchema>;
