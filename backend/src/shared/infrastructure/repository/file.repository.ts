import { FileRepositoryPort } from '@shared/domain/repository';
import { Db, DbSchema } from '../persistence/db';
import {
  TournamentId,
  FileId,
  File,
  NotFoundError,
  SaveFailedError,
} from '@shared/domain';
import { err, ok, Result } from 'neverthrow';
import { Selectable } from 'kysely';

export class FileRepository extends FileRepositoryPort {
  constructor(private readonly db: Db) {
    super();
  }

  private toModel(row: Selectable<DbSchema['file']>): File {
    return File.init({
      tournamentId: TournamentId.init(row.tournamentId),
      id: FileId.init(row.id),
      path: row.path,
    });
  }

  async get(id: {
    tournamentId: TournamentId;
    fileId: FileId;
  }): Promise<Result<File, NotFoundError>> {
    const row = await this.db
      .selectFrom('file')
      .selectAll()
      .where('tournamentId', '=', id.tournamentId)
      .where('id', '=', id.fileId)
      .executeTakeFirst();
    if (row === undefined) {
      return err(
        new NotFoundError(
          `File ${id.fileId} not found in tournament ${id.tournamentId}`,
        ),
      );
    }
    return ok(this.toModel(row));
  }

  async save(file: File): Promise<Result<void, SaveFailedError>> {
    const row = await this.db
      .insertInto('file')
      .values({
        tournamentId: file.tournamentId,
        id: file.id,
        path: file.path,
        createdAt: new Date(),
        updatedAt: null,
      })
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({
          path: (eb) => eb.ref('excluded.path'),
          updatedAt: new Date(),
        }),
      )
      .executeTakeFirst();
    if (row.numInsertedOrUpdatedRows !== 1n) {
      return err(
        new SaveFailedError(
          `Failed to save file ${file.id} in tournament ${file.tournamentId}`,
        ),
      );
    }
    return ok();
  }
}
