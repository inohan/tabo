import { BlobClientPort } from '../../clients/blob';
import { FileId, NotFoundError, TournamentId } from '../../domain';
import { FileRepositoryPort } from '../../domain/repository';
import { err, safeTry } from 'neverthrow';

export class GetFileService {
  constructor(
    private fileRepository: FileRepositoryPort,
    private blobClient: BlobClientPort,
  ) {}

  async get(tournamentId: TournamentId, fileId: FileId) {
    return this.fileRepository.get({ tournamentId, fileId });
  }

  getBlob(tournamentId: TournamentId, fileId: FileId) {
    return safeTry(
      async function* (this: GetFileService) {
        const file = yield* await this.fileRepository.get({
          tournamentId,
          fileId,
        });
        if (file === undefined) {
          return err(
            new NotFoundError(
              `File ${fileId} does not exist in tournament ${tournamentId}`,
            ),
          );
        }
        return this.blobClient.getBlob(file.path);
      }.bind(this),
    );
  }
}
