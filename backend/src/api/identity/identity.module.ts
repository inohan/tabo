import { IdentityDb } from '@identity/infrastructure/persistence/db';
import {
  ListOrganizationTournamentService,
  AddOrganizationTournamentService,
} from '@identity/service';
import { Module } from '@nestjs/common';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const IDENTITY_DB = Symbol('IDENTITY_DB');

@Module({
  providers: [
    {
      provide: IDENTITY_DB,
      useFactory: () =>
        new Kysely({
          dialect: new PostgresDialect({
            pool: new Pool({
              connectionString:
                process.env.DATABASE_URL_IDENTITY ?? process.env.DATABASE_URL!,
              max: 8,
            }),
          }),
          plugins: [new CamelCasePlugin()],
        }),
    },
    {
      provide: ListOrganizationTournamentService,
      useFactory: (db: IdentityDb) => new ListOrganizationTournamentService(db),
      inject: [IDENTITY_DB],
    },
    {
      provide: AddOrganizationTournamentService,
      useFactory: (db: IdentityDb) => new AddOrganizationTournamentService(db),
      inject: [IDENTITY_DB],
    },
  ],
  exports: [
    ListOrganizationTournamentService,
    AddOrganizationTournamentService,
  ],
})
export class IdentityModule {}
