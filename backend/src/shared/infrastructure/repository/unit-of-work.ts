import { err, Result, ResultAsync } from 'neverthrow';
import {
  TransactionContext,
  TransactionError,
  UnitOfWorkPort,
} from 'src/shared/domain/repository';
import { Db } from '../persistence/db';
import { AdjudicatorRepository } from './adjudicator.repository';
import { BreakCategoryRepository } from './break-category.repository';
import { InstitutionRepository } from './institution.repository';
import { SpeakerCategoryRepository } from './speaker-category.repository';
import { SpeakerRepository } from './speaker.repository';
import { TeamRepository } from './team.repository';
import { TournamentRepository } from './tournament.repository';

export class UnitOfWork implements UnitOfWorkPort {
  constructor(private readonly db: Db) {}

  run<T, E>(
    work: (ctx: TransactionContext) => ResultAsync<T, E>,
  ): ResultAsync<T, E | TransactionError> {
    return new ResultAsync(this.execute(work));
  }

  private async execute<T, E>(
    work: (ctx: TransactionContext) => ResultAsync<T, E>,
  ): Promise<Result<T, E | TransactionError>> {
    const trx = await this.db.startTransaction().execute();
    try {
      const result = await work({
        tournamentRepository: new TournamentRepository(trx),
        institutionRepository: new InstitutionRepository(trx),
        teamRepository: new TeamRepository(trx),
        speakerRepository: new SpeakerRepository(trx),
        breakCategoryRepository: new BreakCategoryRepository(trx),
        speakerCategoryRepository: new SpeakerCategoryRepository(trx),
        adjudicatorRepository: new AdjudicatorRepository(trx),
      });
      if (result.isErr()) {
        await trx.rollback().execute();
        return result;
      }
      await trx.commit().execute();
      return result;
    } catch (cause) {
      if (!trx.isCommitted && !trx.isRolledBack) {
        await trx
          .rollback()
          .execute()
          .catch(() => undefined);
      }
      return err(new TransactionError('Transaction failed', { cause }));
    }
  }
}
