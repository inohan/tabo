import { DbSchema } from '@identity/infrastructure/persistence/db';
import {
  ListOrganizationTournamentService,
  AddOrganizationTournamentService,
} from '@identity/service';
import { Module } from '@nestjs/common';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { buildProvider } from '../lib/provider';
import { GetProviderAccessTokenService } from '@identity/service/get-access-token';

export const IDENTITY_DB = Symbol('IDENTITY_DB');
const identityProviders = buildProvider()
  .provide({
    provide: IDENTITY_DB,
    useFactory: () =>
      new Kysely<DbSchema>({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString:
              process.env.DATABASE_URL_IDENTITY ?? process.env.DATABASE_URL!,
            max: 8,
          }),
        }),
        plugins: [new CamelCasePlugin()],
      }),
  })
  .provideClass(ListOrganizationTournamentService, [IDENTITY_DB])
  .provideClass(AddOrganizationTournamentService, [IDENTITY_DB])
  .provideClass(GetProviderAccessTokenService, [IDENTITY_DB]);

export const exportedIdentityProviders = identityProviders.pick([
  ListOrganizationTournamentService,
  AddOrganizationTournamentService,
  GetProviderAccessTokenService,
]);

@Module({
  providers: identityProviders.compile(),
  exports: exportedIdentityProviders.compile(),
})
export class IdentityModule {}
