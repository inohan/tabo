import { Kyselify } from 'drizzle-orm/kysely';
import { tournament } from './schema';
import { Kysely } from 'kysely';
import { Pool } from 'pg';
import { organization } from './auth-schema';

interface DbSchema {
  organization: Kyselify<typeof organization>;
  tournament: Kyselify<typeof tournament>;
}

export type IdentityDb = Kysely<DbSchema>;
