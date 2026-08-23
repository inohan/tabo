import { Result } from 'neverthrow';
import { NotFoundError, SaveFailedError } from '../error';
import { File, FileId, TournamentId } from '../models';

export abstract class FileRepositoryPort {
  abstract get(id: {
    tournamentId: TournamentId;
    fileId: FileId;
  }): Promise<Result<File, NotFoundError>>;

  abstract save(file: File): Promise<Result<void, SaveFailedError>>;
}
