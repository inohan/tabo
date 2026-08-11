import { ImportSessionRepositoryPort } from '../../domain/repository/import-session.repository';
import { Db } from '../persistence/db';
import {
  NotFoundError,
  SaveFailedError,
  TeamId,
  TournamentId,
} from '@shared/domain';
import { err, ok, Result } from 'neverthrow';
import {
  ImportAdjudicatorRow,
  ImportSession,
  ImportSessionId,
  ImportTeamRow,
} from '../../domain/models/import-session';
import { match } from 'ts-pattern';
import { throw_ } from 'src/lib/throw';
import { castJson } from 'src/lib/json';

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
          match(row)
            .returnType<ImportTeamRow>()
            .with(
              { success: true },
              ({
                raw,
                success,
                parsed,
                matched,
                updateNecessity,
                duplication,
                doImport,
              }) =>
                ImportTeamRow.init({
                  raw,
                  success,
                  parsedTeam: parsed ?? throw_(new Error('Missing parsedTeam')),
                  matchedTeam: matched !== null ? TeamId.init(matched) : null,
                  updateNecessity:
                    updateNecessity ??
                    throw_(new Error('Missing updateNecessity')),
                  duplication:
                    duplication ?? throw_(new Error('Missing duplication')),
                  doImport: doImport ?? throw_(new Error('Missing doImport')),
                }),
            )
            .with({ success: false }, ({ raw, success, error }) =>
              ImportTeamRow.init({
                raw,
                success,
                error: error ?? throw_(new Error(`Missing error`)),
              }),
            )
            .exhaustive(),
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
              .values({
                sessionId: importSession.sessionId,
                tournamentId: importSession.tournamentId,
                type: importSession.type,
                createdAt: importSession.createdAt,
                updatedAt: importSession.updatedAt,
                origin: castJson(importSession.origin),
                headers: castJson(importSession.headers),
              })
              .onConflict((oc) =>
                oc.columns(['sessionId']).doUpdateSet({
                  tournamentId: importSession.tournamentId,
                  type: importSession.type,
                  createdAt: importSession.createdAt,
                  updatedAt: importSession.updatedAt,
                  origin: castJson(importSession.origin),
                  headers: castJson(importSession.headers),
                }),
              )
              .executeTakeFirst();
            await trx
              .deleteFrom('importTeamRow')
              .where('sessionId', '=', importSession.sessionId)
              .execute();
            await trx
              .insertInto('importTeamRow')
              .values(
                rows.map((row, seq) => ({
                  sessionId: importSession.sessionId,
                  seq,
                  raw: castJson(row.raw),
                  success: row.success,
                  error: row.success ? null : row.error,
                  parsed: row.success ? castJson(row.parsedTeam) : null,
                  matched: row.success ? row.matchedTeam : null,
                  updateNecessity: row.success
                    ? castJson(row.updateNecessity)
                    : null,
                  duplication: row.success ? castJson(row.duplication) : null,
                  doImport: row.success ? row.doImport : null,
                })),
              )
              .execute();
          });
        })
        .with({ type: 'adjudicator' }, async ({ rows }) => {
          await this.db.transaction().execute(async (trx) => {
            await trx
              .insertInto('importSession')
              .values({
                sessionId: importSession.sessionId,
                tournamentId: importSession.tournamentId,
                type: importSession.type,
                createdAt: importSession.createdAt,
                updatedAt: importSession.updatedAt,
                origin: castJson(importSession.origin),
                headers: castJson(importSession.headers),
              })
              .onConflict((oc) =>
                oc.columns(['sessionId']).doUpdateSet({
                  tournamentId: importSession.tournamentId,
                  type: importSession.type,
                  createdAt: importSession.createdAt,
                  updatedAt: importSession.updatedAt,
                  origin: castJson(importSession.origin),
                  headers: castJson(importSession.headers),
                }),
              )
              .executeTakeFirst();
            await trx
              .deleteFrom('importAdjudicatorRow')
              .where('sessionId', '=', importSession.sessionId)
              .execute();
            await trx
              .insertInto('importAdjudicatorRow')
              .values(
                rows.map((row, seq) => ({
                  sessionId: importSession.sessionId,
                  seq,
                  raw: castJson(row.raw),
                  success: row.success,
                  parsed: row.success ? castJson(row.parsedAdjudicator) : null,
                  classification: row.success ? row.classification : null,
                  error: row.success ? null : row.error,
                })),
              )
              .execute();
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
