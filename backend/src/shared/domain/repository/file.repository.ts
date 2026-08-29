import { Result } from 'neverthrow';
import { SaveFailedError } from '../error';
import { File, FileId, TournamentId } from '../models';

export abstract class FileRepositoryPort {
  abstract get(id: {
    tournamentId: TournamentId;
    fileId: FileId;
  }): Promise<Result<File | undefined, never>>;

  abstract save(file: File): Promise<Result<void, SaveFailedError>>;
}
