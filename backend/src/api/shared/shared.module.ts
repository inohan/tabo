import { Module } from '@nestjs/common';
import { generateClientV1_3 } from '@shared/client/v1.3/tabbycat-1-3';
import {
  AdjudicatorRepositoryPort,
  BreakCategoryRepositoryPort,
  InstitutionRepositoryPort,
  SpeakerCategoryRepositoryPort,
  SpeakerRepositoryPort,
  TeamRepositoryPort,
  TournamentRepositoryPort,
  UnitOfWorkPort,
} from '@shared/domain/repository';
import { Db as SharedDb } from '@shared/infrastructure/persistence/db';
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
  CreateInstitutionService,
  CreateSpeakerCategoryService,
  CreateSpeakerService,
  CreateTeamService,
  CreateTournamentService,
} from '@shared/service';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const SHARED_DB = Symbol('SHARED_DB');
const TABBYCAT_CLIENT_FACTORY = Symbol('TABBYCAT_CLIENT_FACTORY');

const baseProviders = [
  {
    provide: SHARED_DB,
    useFactory: () =>
      new Kysely({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 8,
          }),
        }),
        plugins: [new CamelCasePlugin()],
      }).withSchema('shared'),
  },
  {
    provide: TABBYCAT_CLIENT_FACTORY,
    useValue: generateClientV1_3,
  },
] as const;

const provideRepository = <T>(
  abstract: abstract new (...args: never[]) => T,
  concrete: new (db: SharedDb) => T,
) => ({
  provide: abstract,
  useFactory: (db: SharedDb) => new concrete(db),
  inject: [SHARED_DB],
});

const repositoryProviders = [
  provideRepository(AdjudicatorRepositoryPort, AdjudicatorRepository),
  provideRepository(BreakCategoryRepositoryPort, BreakCategoryRepository),
  provideRepository(InstitutionRepositoryPort, InstitutionRepository),
  provideRepository(SpeakerCategoryRepositoryPort, SpeakerCategoryRepository),
  provideRepository(SpeakerRepositoryPort, SpeakerRepository),
  provideRepository(TeamRepositoryPort, TeamRepository),
  provideRepository(TournamentRepositoryPort, TournamentRepository),
  provideRepository(UnitOfWorkPort, UnitOfWork),
] as const;

type Providers = [
  ...typeof baseProviders,
  ...typeof repositoryProviders,
][number];

type Injected<
  T extends
    | { readonly provide: unknown; useValue: unknown }
    | { readonly provide: unknown; useFactory: (...args: never[]) => unknown },
> = [T] extends [never]
  ? unknown
  : T extends { useValue: unknown }
    ? T['useValue']
    : T extends { useFactory: (...args: never[]) => unknown }
      ? ReturnType<T['useFactory']>
      : unknown;

type MapInjection<T extends Providers['provide'][]> = {
  [K in keyof T]: Injected<Extract<Providers, { readonly provide: T[K] }>>;
};

const provideService = <
  T,
  U extends [Providers['provide'], ...Providers['provide'][]],
>(
  service: new (...args: MapInjection<U>) => T,
  inject: U,
) => ({
  provide: service,
  useFactory: (...args: MapInjection<U>) => new service(...args),
  inject,
});

const serviceProviders = [
  provideService(CreateAdjudicatorService, [
    TournamentRepositoryPort,
    AdjudicatorRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ]),
  provideService(CreateBreakCategoryService, [
    TournamentRepositoryPort,
    BreakCategoryRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ]),
  provideService(CreateInstitutionService, [
    TournamentRepositoryPort,
    InstitutionRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ]),
  provideService(CreateSpeakerCategoryService, [
    TournamentRepositoryPort,
    SpeakerCategoryRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ]),
  provideService(CreateSpeakerService, [
    TournamentRepositoryPort,
    SpeakerRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ]),
  provideService(CreateTeamService, [
    TournamentRepositoryPort,
    UnitOfWorkPort,
    TABBYCAT_CLIENT_FACTORY,
  ]),
  provideService(CreateTournamentService, [
    TournamentRepositoryPort,
    TABBYCAT_CLIENT_FACTORY,
  ]),
] as const;

@Module({
  providers: [...baseProviders, ...repositoryProviders, ...serviceProviders],
  exports: serviceProviders.map((provider) => provider.provide),
})
export class SharedModule {}
