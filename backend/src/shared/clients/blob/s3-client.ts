import { match, P } from 'ts-pattern';
import { BlobClientPort } from './blob-client';
import {
  S3Client,
  S3ClientConfig,
  PutObjectCommand,
  GetObjectCommand,
  NoSuchKey,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { throw_, throwUnexpected_ } from 'src/lib/throw';
import { FileError, NotFoundError } from '@shared/domain';
import { err, ok, Result } from 'neverthrow';
import { fileTypeFromBlob } from 'file-type';

/** SigV4 caps presigned URL lifetimes at 7 days. */
const MAX_EXPIRES_IN = 60 * 60 * 24 * 7;
const DEFAULT_EXPIRES_IN = 60 * 15;

export class S3BlobClient extends BlobClientPort {
  client: S3Client;

  constructor(
    private config: S3ClientConfig,
    private bucket: string,
  ) {
    super();
    this.client = new S3Client(config);
  }

  async issueUploadUrl(
    id: string,
    options?: { mimeType?: string; expiresIn?: number },
  ): Promise<Result<string, never>> {
    const expiresIn = options?.expiresIn ?? DEFAULT_EXPIRES_IN;
    if (expiresIn <= 0 || expiresIn > MAX_EXPIRES_IN) {
      throw new Error(
        `\`expiresIn\` value must be between 1 and ${MAX_EXPIRES_IN} seconds.`,
      );
    }
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: id,
      ContentType: options?.mimeType,
    });
    return ok(await getSignedUrl(this.client, command, { expiresIn }));
  }

  async upload(id: string, blob: Blob): Promise<Result<void, FileError>> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: id,
      ContentType: blob.type,
      Body: blob,
    });
    try {
      await this.client.send(command);
      return ok();
    } catch (e) {
      if (e instanceof Error) {
        return err(new FileError(`Upload failed: ${e.message}`, { cause: e }));
      } else {
        return err(new FileError(`Unexpected upload fail`, { cause: e }));
      }
    }
  }

  async getBlob(
    id: string,
    options?: {
      throwOnUnknownFileType?: boolean;
      throwOnFileTypeMismatch?: boolean;
    },
  ): Promise<Result<Blob, FileError | NotFoundError>> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: id,
    });
    try {
      const response = await this.client.send(command);
      const bodyStream =
        response.Body?.transformToWebStream() ??
        throwUnexpected_('getBlob failed: body does not exist.');
      const blob = await new Response(bodyStream).blob();
      let fileTypeInferred = (await fileTypeFromBlob(blob))?.mime;
      if (fileTypeInferred === undefined) {
        if (options?.throwOnUnknownFileType ?? true) {
          return err(new FileError(`Unknown file type for S3 object ${id}`));
        }
        fileTypeInferred = response.ContentType;
      } else if (
        response.ContentType !== undefined &&
        response.ContentType !== fileTypeInferred
      ) {
        console.info(
          `File type mismatch in S3 object ${id}: predicted: ${fileTypeInferred}, metadata: ${response.ContentType}`,
        );
        if (options?.throwOnFileTypeMismatch ?? true) {
          return err(
            new FileError(
              `File type mismatch in S3 object ${id}: predicted: ${fileTypeInferred}, metadata: ${response.ContentType}`,
            ),
          );
        }
      }
      return ok(blob.slice(0, blob.size, fileTypeInferred));
    } catch (e) {
      return match(e)
        .with(P.instanceOf(NoSuchKey), (e) =>
          err(
            new NotFoundError(`S3 object ${id} does not exist.`, { cause: e }),
          ),
        )
        .with(P.instanceOf(Error), (e) =>
          err(
            new FileError(`Error getting S3 object: ${e.message}`, {
              cause: e,
            }),
          ),
        )
        .otherwise((e) =>
          throw_(new Error(`Unexpected error at getBlob`, { cause: e })),
        );
    }
  }
}
