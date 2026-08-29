import { BlobClientPort } from '../../clients/blob';
import { FileId, NotFoundError, TournamentId } from '../../domain';
import { FileRepositoryPort } from '../../domain/repository';
import { err, ok, safeTry } from 'neverthrow';

export class GenerateFileUploadUrlService {
  constructor(
    private fileRepository: FileRepositoryPort,
    private blobClient: BlobClientPort,
  ) {}

  async execute({
    tournamentId,
    fileId,
    options,
  }: {
    tournamentId: TournamentId;
    fileId: FileId;
    options?: {
      mimeType?: string;
      expiresIn?: number;
    };
  }) {
    return await safeTry(
      async function* (this: GenerateFileUploadUrlService) {
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
        const uploadUrl = yield* await this.blobClient.issueUploadUrl(
          file.path,
          options,
        );
        return ok(uploadUrl);
      }.bind(this),
    );
  }
}
