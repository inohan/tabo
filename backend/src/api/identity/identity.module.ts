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
import { auth, IdentityAuth } from '@identity/infrastructure/persistence/auth';
import { auth as testAuth } from '@identity/infrastructure/persistence/auth.test';

export const IDENTITY_DB = Symbol('IDENTITY_DB');
export const IDENTITY_AUTH = Symbol('IDENTITY_AUTH');
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
  .provide({
    provide: IDENTITY_AUTH,
    useFactory: (): IdentityAuth => {
      if (process.env.NODE_ENV === 'production') {
        return auth;
      } else {
        return testAuth as unknown as IdentityAuth;
      }
    },
  })
  .provideClass(ListOrganizationTournamentService, [IDENTITY_DB])
  .provideClass(AddOrganizationTournamentService, [IDENTITY_DB])
  .provideClass(GetProviderAccessTokenService, [IDENTITY_AUTH]);

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
