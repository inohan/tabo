import { Module } from '@nestjs/common';
import { SharedModule, sharedProvidersExported } from '../shared/shared.module';
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
import { AdjudicatorImportSessionRepository } from '@importer/infrastructure/repository';
import {
  CreateTeamImportSessionService,
  ExecuteTeamImportService,
  GetImportOriginCandidateService,
  SetTeamDoImportStatusService,
} from '@importer/service';
import {
  BreakCategoryQuery,
  InstitutionQuery,
  SpeakerCategoryQuery,
  TeamQuery,
} from '@shared/infrastructure/query';
import { buildProvider } from '../lib/provider';
import {
  ReadImportOriginService,
  GetTeamImportSessionService,
} from '@importer/service';
import { IdentityModule } from '../identity/identity.module';
import { TeamImportSessionQuery } from '@importer/infrastructure/query';
import {
  CreateBreakCategoryService,
  CreateInstitutionService,
  CreateSpeakerCategoryService,
  CreateTeamService,
  GetFileService,
} from '@shared/service';
import { ExcelClient } from '@shared/clients/excel';
import { CsvClient } from '@shared/clients/csv';
import { GoogleSheetsClient } from '@importer/clients/google-sheet';

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
  .provideClass(ReadImportOriginService, [
    GetFileService,
    CsvClient,
    ExcelClient,
    GoogleSheetsClient,
  ])
  .provideClass(GetImportOriginCandidateService, [
    GetFileService,
    ExcelClient,
    GoogleSheetsClient,
  ])
  .provideClass(GetTeamImportSessionService, [TeamImportSessionQuery])
  .provideClass(CreateTeamImportSessionService, [
    TeamImportSessionRepositoryPort,
    TeamQuery,
    ReadImportOriginService,
  ])
  .provideClass(ExecuteTeamImportService, [
    TeamImportSessionRepositoryPort,
    InstitutionQuery,
    BreakCategoryQuery,
    SpeakerCategoryQuery,
    CreateInstitutionService,
    CreateBreakCategoryService,
    CreateSpeakerCategoryService,
    CreateTeamService,
  ])
  .provideClass(SetTeamDoImportStatusService, [
    TeamImportSessionRepositoryPort,
  ]);

export const exportedImporterProviders = importerProviders.pick([
  ReadImportOriginService,
  CreateTeamImportSessionService,
  GetTeamImportSessionService,
  SetTeamDoImportStatusService,
  ExecuteTeamImportService,
]);

@Module({
  imports: [SharedModule, IdentityModule],
  controllers: [TeamImportController, AdjudicatorController],
  providers: importerProviders.compile(),
  exports: exportedImporterProviders.compile(),
})
export class ImporterModule {}
