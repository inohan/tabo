import { FileError, NotFoundError } from '@shared/domain';
import { Result } from 'neverthrow';

export abstract class BlobClientPort {
  abstract issueUploadUrl(
    id: string,
    options?: {
      mimeType?: string;
      expiresIn?: number;
    },
  ): Promise<Result<string, never>>;

  abstract upload(id: string, blob: Blob): Promise<Result<void, FileError>>;

  abstract getBlob(
    id: string,
    options?: {
      /**
       * Throws when file type cannot be determined. Defaults to `true`.
       */
      throwOnUnknownFileType?: boolean;
      /**
       * Throws when file type from metadata and detected file type do not match. Defaults to `true`.
       */
      throwOnFileTypeMismatch?: boolean;
    },
  ): Promise<Result<Blob, FileError | NotFoundError>>;
}
