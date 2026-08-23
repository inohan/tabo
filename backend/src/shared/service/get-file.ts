import { BlobClientPort } from '@shared/clients/blob';
import { FileId, TournamentId } from '@shared/domain';
import { FileRepositoryPort } from '@shared/domain/repository';
import { safeTry } from 'neverthrow';

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
        return this.blobClient.getBlob(file.path);
      }.bind(this),
    );
  }
}
