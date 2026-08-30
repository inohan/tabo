import { Module } from '@nestjs/common';
import { generateClientV1_3 } from '@shared/clients/tabbycat/v1.3/tabbycat-1-3';
import {
  AdjudicatorRepositoryPort,
  BreakCategoryRepositoryPort,
  FileRepositoryPort,
  InstitutionRepositoryPort,
  SpeakerCategoryRepositoryPort,
  SpeakerRepositoryPort,
  TeamRepositoryPort,
  TournamentRepositoryPort,
  UnitOfWorkPort,
} from '@shared/domain/repository';
import { Db as SharedDb } from '@shared/infrastructure/persistence/db';
import {
  BreakCategoryQuery,
  InstitutionQuery,
  SpeakerCategoryQuery,
  TeamQuery,
  TournamentQuery,
} from '@shared/infrastructure/query';
import {
  AdjudicatorRepository,
  BreakCategoryRepository,
  InstitutionRepository,
  SpeakerCategoryRepository,
  SpeakerRepository,
  TeamRepository,
  TournamentRepository,
  UnitOfWork,
} from '@shared/infrastructure/repository';
import {
  CreateAdjudicatorService,
  CreateBreakCategoryService,
  CreateFileService,
  CreateInstitutionService,
  CreateSpeakerCategoryService,
  CreateSpeakerService,
  CreateTeamService,
  CreateTournamentService,
  GenerateFileUploadUrlService,
  GetFileService,
  GetInstitutionService,
  GetTournamentService,
  ListInstitutionsService,
  ListTournamentsService,
  SyncInstitutionsService,
  VerifyTournamentService,
} from '@shared/service';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { buildProvider } from '../lib/provider';
import { FileRepository } from '@shared/infrastructure/repository/file.repository';
import { BlobClientPort, S3BlobClient } from '@shared/clients/blob';
import { throwUnexpected_ } from 'src/lib/throw';
import { CsvClient } from '@shared/clients/csv';
import { ExcelClient } from '@shared/clients/excel';
import { GoogleSheetsClient } from '@importer/clients/google-sheet';

export const SHARED_DB = Symbol('SHARED_DB');
export const TABBYCAT_CLIENT_FACTORY = Symbol('TABBYCAT_CLIENT_FACTORY');

const sharedProviders = buildProvider()
  .provide({
    provide: SHARED_DB,
    useFactory: () =>
      new Kysely({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString:
              process.env.DATABASE_URL_SHARED ?? process.env.DATABASE_URL,
            max: 8,
          }),
        }),
        plugins: [new CamelCasePlugin()],
      }).withSchema('shared') as SharedDb,
  })
  .provide({ provide: TABBYCAT_CLIENT_FACTORY, useValue: generateClientV1_3 })
  .provide({
    provide: BlobClientPort,
    useFactory: () =>
      new S3BlobClient(
        {
          endpoint: process.env.S3_ENDPOINT,
          region: process.env.S3_REGION ?? 'us-east-1',
          credentials: {
            accessKeyId:
              process.env.S3_ACCESS_KEY_ID ??
              throwUnexpected_('Missing env S3_ACCESS_KEY_ID'),
            secretAccessKey:
              process.env.S3_SECRET_ACCESS_KEY ??
              throwUnexpected_('Missing env S3_SECRET_ACCESS_KEY'),
          },
        },
        process.env.S3_BUCKET_NAME ?? 'tabo',
      ),
  })
  .provideClass(CsvClient, [])
  .provideClass(ExcelClient, [])
  .provideClass(GoogleSheetsClient, [])
  .provideAbstractClass(AdjudicatorRepositoryPort, AdjudicatorRepository, [
    SHARED_DB,
  ])
  .provideAbstractClass(BreakCategoryRepositoryPort, BreakCategoryRepository, [
    SHARED_DB,
  ])
  .provideAbstractClass(InstitutionRepositoryPort, InstitutionRepository, [
    SHARED_DB,
  ])
  .provideAbstractClass(
    SpeakerCategoryRepositoryPort,
    SpeakerCategoryRepository,
    [SHARED_DB],
  )
  .provideAbstractClass(SpeakerRepositoryPort, SpeakerRepository, [SHARED_DB])
  .provideAbstractClass(TeamRepositoryPort, TeamRepository, [SHARED_DB])
  .provideAbstractClass(TournamentRepositoryPort, TournamentRepository, [
    SHARED_DB,
  ])
  .provideAbstractClass(FileRepositoryPort, FileRepository, [SHARED_DB])
  .provideAbstractClass(UnitOfWorkPort, UnitOfWork, [SHARED_DB])
  .provideClass(TournamentQuery, [SHARED_DB])
  .provideClass(InstitutionQuery, [SHARED_DB])
  .provideClass(TeamQuery, [SHARED_DB])
  .provideClass(BreakCategoryQuery, [SHARED_DB])
  .provideClass(SpeakerCategoryQuery, [SHARED_DB])
  .provideClass(CreateAdjudicatorService, [
    TournamentRepositoryPort,
    AdjudicatorRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ])
  .provideClass(CreateBreakCategoryService, [
    TournamentRepositoryPort,
    BreakCategoryRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ])
  .provideClass(CreateInstitutionService, [
    TournamentRepositoryPort,
    InstitutionRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ])
  .provideClass(CreateSpeakerCategoryService, [
    TournamentRepositoryPort,
    SpeakerCategoryRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ])
  .provideClass(CreateSpeakerService, [
    TournamentRepositoryPort,
    SpeakerRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ])
  .provideClass(CreateTeamService, [
    TournamentRepositoryPort,
    UnitOfWorkPort,
    TABBYCAT_CLIENT_FACTORY,
  ])
  .provideClass(CreateTournamentService, [
    TournamentRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ])
  .provideClass(GetTournamentService, [TournamentQuery])
  .provideClass(ListTournamentsService, [TournamentQuery])
  .provideClass(VerifyTournamentService, [TABBYCAT_CLIENT_FACTORY])
  .provideClass(GetInstitutionService, [InstitutionQuery])
  .provideClass(ListInstitutionsService, [InstitutionQuery])
  .provideClass(SyncInstitutionsService, [
    TournamentRepositoryPort,
    UnitOfWorkPort,
    TABBYCAT_CLIENT_FACTORY,
  ])
  .provideClass(GetFileService, [FileRepositoryPort, BlobClientPort])
  .provideClass(CreateFileService, [
    TournamentRepositoryPort,
    FileRepositoryPort,
  ])
  .provideClass(GenerateFileUploadUrlService, [
    FileRepositoryPort,
    BlobClientPort,
  ]);

export const sharedProvidersExported = sharedProviders.pick([
  TABBYCAT_CLIENT_FACTORY,
  CsvClient,
  ExcelClient,
  GoogleSheetsClient,
  AdjudicatorRepositoryPort,
  BreakCategoryRepositoryPort,
  InstitutionRepositoryPort,
  SpeakerCategoryRepositoryPort,
  SpeakerRepositoryPort,
  TeamRepositoryPort,
  TournamentRepositoryPort,
  UnitOfWorkPort,
  TournamentQuery,
  InstitutionQuery,
  TeamQuery,
  GetTournamentService,
  CreateTournamentService,
  ListTournamentsService,
  VerifyTournamentService,
  GetInstitutionService,
  ListInstitutionsService,
  SyncInstitutionsService,
  CreateInstitutionService,
  BreakCategoryQuery,
  SpeakerCategoryQuery,
  CreateAdjudicatorService,
  CreateBreakCategoryService,
  CreateSpeakerCategoryService,
  CreateTeamService,
  GetFileService,
  CreateFileService,
  GenerateFileUploadUrlService,
]);

@Module({
  providers: sharedProviders.compile(),
  exports: sharedProvidersExported.compile(),
})
export class SharedModule {}
