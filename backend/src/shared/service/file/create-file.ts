import { err, ok, safeTry } from 'neverthrow';
import { File, NotFoundError, TournamentId } from '../../domain';
import {
  FileRepositoryPort,
  TournamentRepositoryPort,
} from '@shared/domain/repository';

export class CreateFileService {
  constructor(
    private tournamentRepository: TournamentRepositoryPort,
    private fileRepository: FileRepositoryPort,
  ) {}

  async execute({ tournamentId }: { tournamentId: TournamentId }) {
    return await safeTry(
      async function* (this: CreateFileService) {
        const tournament =
          yield* await this.tournamentRepository.get(tournamentId);
        if (tournament === undefined) {
          return err(
            new NotFoundError(`Tournament ${tournamentId} does not exist.`),
          );
        }
        const file = File.create({ tournamentId });
        yield* await this.fileRepository.save(file);
        return ok(file.id);
      }.bind(this),
    );
  }
}
