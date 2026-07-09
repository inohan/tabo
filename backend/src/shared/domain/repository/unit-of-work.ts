import { ResultAsync } from 'neverthrow';
import { AdjudicatorRepositoryPort } from './adjudicator.repository';
import { BreakCategoryRepositoryPort } from './break-category.repository';
import { InstitutionRepositoryPort } from './institution.repository';
import { SpeakerCategoryRepositoryPort } from './speaker-category.repository';
import { SpeakerRepositoryPort } from './speaker.repository';
import { TeamRepositoryPort } from './team.repository';
import { TournamentRepositoryPort } from './tournament.repository';

export class TransactionError extends Error {}

export interface TransactionContext {
  tournamentRepository: TournamentRepositoryPort;
  institutionRepository: InstitutionRepositoryPort;
  teamRepository: TeamRepositoryPort;
  speakerRepository: SpeakerRepositoryPort;
  breakCategoryRepository: BreakCategoryRepositoryPort;
  speakerCategoryRepository: SpeakerCategoryRepositoryPort;
  adjudicatorRepository: AdjudicatorRepositoryPort;
}

export abstract class UnitOfWorkPort {
  abstract run<T, E>(
    work: (ctx: TransactionContext) => ResultAsync<T, E>,
  ): ResultAsync<T, E | TransactionError>;
}
