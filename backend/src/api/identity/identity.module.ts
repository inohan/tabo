import { IdentityDb } from '@identity/infrastructure/persistence/db';
import { ListTournamentService } from '@identity/service/list-tournaments';
import { Module } from '@nestjs/common';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const IDENTITY_DB = Symbol('IDENTITY_DB');

@Module({
  providers: [
    {
      provide: IDENTITY_DB,
      useFactory: () => {
        new Kysely({
          dialect: new PostgresDialect({
            pool: new Pool({
              connectionString:
                process.env.DATABASE_URL_IDENTITY ?? process.env.DATABASE_URL!,
              max: 8,
            }),
          }),
          plugins: [new CamelCasePlugin()],
        });
      },
    },
    {
      provide: ListTournamentService,
      useFactory: (db: IdentityDb) => new ListTournamentService(db),
      inject: [IDENTITY_DB],
    },
  ],
  exports: [ListTournamentService],
})
export class IdentityModule {}
