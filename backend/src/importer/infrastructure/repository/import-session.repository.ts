import { ImportSessionRepositoryPort } from '../../domain/repository/import-session.repository';
import { Db } from '../persistence/db';
import { NotFoundError, SaveFailedError, TournamentId } from '@shared/domain';
import { err, ok, Result } from 'neverthrow';
import {
  ImportAdjudicatorRow,
  ImportSession,
  ImportSessionId,
  ImportTeamRow,
} from '../../domain/models/import-session';
import { match } from 'ts-pattern';
import { throw_ } from 'src/lib/throw';

export class ImportSessionRepository extends ImportSessionRepositoryPort {
  constructor(private db: Db) {
    super();
  }

  async get({
    tournamentId,
    type,
  }: {
    tournamentId: TournamentId;
    type: 'team' | 'adjudicator';
  }): Promise<Result<ImportSession, NotFoundError>> {
    const importSession = await this.db
      .selectFrom('importSession')
      .selectAll()
      .where('tournamentId', '=', tournamentId)
      .where('type', '=', type)
      .executeTakeFirst();
    if (importSession === undefined) {
      return err(
        new NotFoundError(
          `${type} import session not found in tournament ${tournamentId}.`,
        ),
      );
    }
    const rowsContent = await match(importSession)
      .with({ type: 'team' }, async ({ type, sessionId }) => {
        const importRowsRaw = await this.db
          .selectFrom('importTeamRow')
          .selectAll()
          .where('sessionId', '=', sessionId)
          .orderBy('seq')
          .execute();
        const importRows = importRowsRaw.map((row) =>
          ImportTeamRow.init(
            match(row)
              .with(
                { success: true },
                ({ raw, success, parsed, classification }) => ({
                  raw,
                  success,
                  parsedTeam: parsed ?? throw_(new Error(`Missing parsedTeam`)),
                  classification:
                    classification ??
                    throw_(new Error(`Missing classification`)),
                }),
              )
              .with({ success: false }, ({ raw, success, error }) => ({
                raw,
                success,
                error: error ?? throw_(new Error(`Missing error`)),
              }))
              .exhaustive(),
          ),
        );
        return {
          type,
          rows: importRows,
        };
      })
      .with({ type: 'adjudicator' }, async ({ type, sessionId }) => {
        const importRowsRaw = await this.db
          .selectFrom('importAdjudicatorRow')
          .selectAll()
          .where('sessionId', '=', sessionId)
          .orderBy('seq')
          .execute();
        const importRows = importRowsRaw.map((row) =>
          ImportAdjudicatorRow.init(
            match(row)
              .with(
                { success: true },
                ({ raw, success, parsed, classification }) => ({
                  raw,
                  success,
                  parsedAdjudicator:
                    parsed ?? throw_(new Error(`Missing parsedAdjudicator`)),
                  classification:
                    classification ??
                    throw_(new Error(`Missing classification`)),
                }),
              )
              .with({ success: false }, ({ raw, success, error }) => ({
                raw,
                success,
                error: error ?? throw_(new Error(`Missing error`)),
              }))
              .exhaustive(),
          ),
        );
        return {
          type,
          rows: importRows,
        };
      })
      .exhaustive();
    return ok(
      ImportSession.init({
        sessionId: ImportSessionId.init(importSession.sessionId),
        tournamentId: TournamentId.init(importSession.tournamentId),
        origin: importSession.origin,
        createdAt: importSession.createdAt,
        updatedAt: importSession.updatedAt,
        headers: importSession.headers,
        ...rowsContent,
      }),
    );
  }

  async save(
    importSession: ImportSession,
  ): Promise<Result<void, SaveFailedError>> {
    try {
      await match(importSession)
        .with({ type: 'team' }, async ({ rows }) => {
          await this.db.transaction().execute(async (trx) => {
            await trx
              .insertInto('importSession')
              .values(importSession)
              .onConflict((oc) =>
                oc.columns(['sessionId']).doUpdateSet({
                  updatedAt: new Date(),
                }),
              )
              .executeTakeFirst();
            await trx
              .deleteFrom('importTeamRow')
              .where('sessionId', '=', importSession.sessionId)
              .execute();
            for (const [seq, row] of rows.entries()) {
              await trx
                .insertInto('importTeamRow')
                .values({
                  sessionId: importSession.sessionId,
                  seq,
                  raw: row.raw,
                  success: row.success,
                  parsed: row.success ? row.parsedTeam : null,
                  classification: row.success ? row.classification : null,
                  error: row.success ? null : row.error,
                })
                .executeTakeFirst();
            }
          });
        })
        .with({ type: 'adjudicator' }, async ({ rows }) => {
          await this.db.transaction().execute(async (trx) => {
            await trx
              .insertInto('importSession')
              .values(importSession)
              .onConflict((oc) =>
                oc.columns(['sessionId']).doUpdateSet({
                  updatedAt: new Date(),
                }),
              )
              .executeTakeFirst();
            await trx
              .deleteFrom('importAdjudicatorRow')
              .where('sessionId', '=', importSession.sessionId)
              .execute();
            for (const [seq, row] of rows.entries()) {
              await trx
                .insertInto('importAdjudicatorRow')
                .values({
                  sessionId: importSession.sessionId,
                  seq,
                  raw: row.raw,
                  success: row.success,
                  parsed: row.success ? row.parsedAdjudicator : null,
                  classification: row.success ? row.classification : null,
                  error: row.success ? null : row.error,
                })
                .executeTakeFirst();
            }
          });
        })
        .exhaustive();
      return ok();
    } catch (error) {
      console.error(error);
      return err(
        new SaveFailedError(
          `Failed to save import session ${importSession.sessionId} for tournament ${importSession.tournamentId}.`,
        ),
      );
    }
  }

  async delete(
    importSession: ImportSession,
  ): Promise<Result<void, NotFoundError>> {
    const deleted = await this.db
      .deleteFrom('importSession')
      .where('sessionId', '=', importSession.sessionId)
      .executeTakeFirst();
    if (deleted.numDeletedRows === 0n) {
      return err(
        new NotFoundError(
          `Import session ${importSession.sessionId} not found in tournament ${importSession.tournamentId}.`,
        ),
      );
    }
    return ok();
  }
}
