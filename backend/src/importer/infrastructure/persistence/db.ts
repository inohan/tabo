import { Kysely } from 'kysely';
import * as s from './schema';
import { Kyselify } from 'drizzle-orm/kysely';
interface DbSchema {
  importSession: Kyselify<typeof s.importSessionTable>;
  importTeamRow: Kyselify<typeof s.importTeamRowTable>;
  importAdjudicatorRow: Kyselify<typeof s.importAdjudicatorRowTable>;
}

export type Db = Kysely<DbSchema>;
