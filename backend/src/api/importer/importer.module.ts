import { Module } from '@nestjs/common';
import {
  SharedModule,
  sharedProvidersExported,
  TABBYCAT_CLIENT_FACTORY,
} from '../shared/shared.module';
import { TeamImportController } from './team/team.controller';
import { AdjudicatorController } from './adjudicator/adjudicator.controller';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Db as ImporterDb } from '@importer/infrastructure/persistence/db';
import {
  AdjudicatorImportSessionRepositoryPort,
  TeamImportSessionRepositoryPort,
} from '@importer/domain/repository';
import { TeamImportSessionRepository } from '@importer/infrastructure/repository';
import { AdjudicatorImportSessionRepository } from '@importer/infrastructure/repository/adjudicator-import-session.repository';
import {
  CreateTeamImportSessionService,
  ExecuteTeamImportService,
} from '@importer/service';
import {
  BreakCategoryQuery,
  InstitutionQuery,
  SpeakerCategoryQuery,
  TeamQuery,
} from '@shared/infrastructure/query';
import { buildProvider } from '../lib/provider';
import { ReadFileService } from '@importer/service/read-file';
import { IdentityModule } from '../identity/identity.module';
import {
  BreakCategoryRepositoryPort,
  InstitutionRepositoryPort,
  SpeakerCategoryRepositoryPort,
  TournamentRepositoryPort,
  UnitOfWorkPort,
} from '@shared/domain/repository';
import { GetTeamImportSessionService } from '@importer/service/get-team-import';
import { TeamImportSessionQuery } from '@importer/infrastructure/query/team-import-session.query';

const IMPORTER_DB = Symbol('IMPORTER_DB');

const importerProviders = buildProvider()
  .dependsOn(sharedProvidersExported)
  .provide({
    provide: IMPORTER_DB,
    useFactory: () =>
      new Kysely({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString:
              process.env.DATABASE_URL_IMPORTER ?? process.env.DATABASE_URL,
            max: 8,
          }),
        }),
        plugins: [new CamelCasePlugin()],
      }).withSchema('importer') as ImporterDb,
  })
  .provideAbstractClass(
    TeamImportSessionRepositoryPort,
    TeamImportSessionRepository,
    [IMPORTER_DB],
  )
  .provideAbstractClass(
    AdjudicatorImportSessionRepositoryPort,
    AdjudicatorImportSessionRepository,
    [IMPORTER_DB],
  )
  .provideClass(TeamImportSessionQuery, [IMPORTER_DB, TeamQuery])
  .provideClass(ReadFileService, [])
  .provideClass(GetTeamImportSessionService, [TeamImportSessionQuery])
  .provideClass(CreateTeamImportSessionService, [
    TeamImportSessionRepositoryPort,
    TeamQuery,
    InstitutionQuery,
    BreakCategoryQuery,
    SpeakerCategoryQuery,
    ReadFileService,
  ])
  .provideClass(ExecuteTeamImportService, [
    TeamImportSessionRepositoryPort,
    TournamentRepositoryPort,
    InstitutionRepositoryPort,
    InstitutionQuery,
    BreakCategoryRepositoryPort,
    BreakCategoryQuery,
    SpeakerCategoryRepositoryPort,
    SpeakerCategoryQuery,
    UnitOfWorkPort,
    TABBYCAT_CLIENT_FACTORY,
  ]);

export const exportedImporterProviders = importerProviders.pick([
  ReadFileService,
  GetTeamImportSessionService,
  CreateTeamImportSessionService,
  ExecuteTeamImportService,
]);

@Module({
  imports: [SharedModule, IdentityModule],
  controllers: [TeamImportController, AdjudicatorController],
  providers: importerProviders.compile(),
  exports: exportedImporterProviders.compile(),
})
export class ImporterModule {}
