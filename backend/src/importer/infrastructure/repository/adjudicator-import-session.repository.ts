import { AdjudicatorImportSessionRepositoryPort } from '../../domain/repository';
import { Db, DbSchema } from '../persistence/db';
import {
  AdjudicatorId,
  NotFoundError,
  SaveFailedError,
  TournamentId,
} from '@shared/domain';
import { err, ok, Result } from 'neverthrow';
import {
  AdjudicatorImportSession,
  AdjudicatorImportSessionId,
  AdjudicatorImportRow,
} from '../../domain/models/adjudicator-import-session';
import { match } from 'ts-pattern';
import { throw_, throwUnexpected_ } from 'src/lib/throw';
import { castJson } from 'src/lib/json';
import { Selectable } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

const toSessionModel = (
  session: Selectable<
    DbSchema['adjudicatorImportSession'] & {
      rows: Selectable<DbSchema['importAdjudicatorRow']>[];
    }
  >,
): AdjudicatorImportSession =>
  match(session)
    .returnType<AdjudicatorImportSession>()
    .with({ status: 'incomplete' }, (session) =>
      AdjudicatorImportSession.init({
        id: AdjudicatorImportSessionId.init(session.sessionId),
        tournamentId: TournamentId.init(session.tournamentId),
        origin: session.origin,
        headers: session.headers,
        rows: session.rows.map(toRowModel),
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        status: session.status,
      }),
    )
    .with({ status: 'missing-entities' }, (session) =>
      AdjudicatorImportSession.init({
        id: AdjudicatorImportSessionId.init(session.sessionId),
        tournamentId: TournamentId.init(session.tournamentId),
        origin: session.origin,
        headers: session.headers,
        rows: session.rows.map(toRowModel),
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        status: session.status,
        error: session.errorDetail ?? throwUnexpected_(),
      }),
    )
    .with({ status: 'new-adjudicators' }, (session) =>
      AdjudicatorImportSession.init({
        id: AdjudicatorImportSessionId.init(session.sessionId),
        tournamentId: TournamentId.init(session.tournamentId),
        origin: session.origin,
        headers: session.headers,
        rows: session.rows.map(toRowModel),
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        status: session.status,
      }),
    )
    .with({ status: 'success' }, (session) =>
      AdjudicatorImportSession.init({
        id: AdjudicatorImportSessionId.init(session.sessionId),
        tournamentId: TournamentId.init(session.tournamentId),
        origin: session.origin,
        headers: session.headers,
        rows: session.rows.map(toRowModel),
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        status: session.status,
      }),
    )
    .exhaustive();

const toRowModel = (
  row: Selectable<DbSchema['importAdjudicatorRow']>,
): AdjudicatorImportRow =>
  match(row)
    .returnType<AdjudicatorImportRow>()
    .with(
      { success: true },
      ({
        success,
        parsed,
        matched,
        updateNecessity,
        duplication,
        doImport,
        raw,
      }) =>
        AdjudicatorImportRow.init({
          success,
          raw,
          parsed: parsed !== null ? parsed : throw_(new Error()),
          matched: matched !== null ? AdjudicatorId.init(matched) : null,
          updateNecessity:
            updateNecessity !== null ? updateNecessity : throw_(new Error()),
          duplication: duplication !== null ? duplication : throw_(new Error()),
          doImport: doImport !== null ? doImport : throw_(new Error()),
        }),
    )
    .with({ success: false }, ({ success, error, raw }) =>
      AdjudicatorImportRow.init({
        success,
        raw,
        error: error !== null ? error : throw_(new Error()),
      }),
    )
    .exhaustive();

export class AdjudicatorImportSessionRepository extends AdjudicatorImportSessionRepositoryPort {
  constructor(private db: Db) {
    super();
  }

  async get({
    tournamentId,
    importSessionId,
  }: {
    tournamentId: TournamentId;
    importSessionId: AdjudicatorImportSessionId;
  }): Promise<Result<AdjudicatorImportSession, NotFoundError>> {
    const importSession = await this.db
      .selectFrom('adjudicatorImportSession')
      .selectAll()
      .select((eb) => [
        jsonArrayFrom(
          eb
            .selectFrom('importAdjudicatorRow')
            .selectAll()
            .whereRef(
              'importAdjudicatorRow.sessionId',
              '=',
              'adjudicatorImportSession.sessionId',
            )
            .orderBy('seq'),
        ).as('rows'),
      ])
      .where('tournamentId', '=', tournamentId)
      .where('sessionId', '=', importSessionId)
      .executeTakeFirst();
    if (importSession === undefined) {
      return err(
        new NotFoundError(
          `Adjudicator import session ${importSessionId} not found.`,
        ),
      );
    }
    return ok(toSessionModel(importSession));
  }

  async getByTournament({
    tournamentId,
  }: {
    tournamentId: TournamentId;
  }): Promise<Result<AdjudicatorImportSession[], never>> {
    const importSessions = await this.db
      .selectFrom('adjudicatorImportSession')
      .selectAll()
      .select((eb) => [
        jsonArrayFrom(
          eb
            .selectFrom('importAdjudicatorRow')
            .selectAll()
            .whereRef(
              'importAdjudicatorRow.sessionId',
              '=',
              'adjudicatorImportSession.sessionId',
            )
            .orderBy('seq'),
        ).as('rows'),
      ])
      .where('tournamentId', '=', tournamentId)
      .execute();
    return ok(importSessions.map(toSessionModel));
  }

  async save(
    importSession: AdjudicatorImportSession,
  ): Promise<Result<void, SaveFailedError>> {
    try {
      await this.db.transaction().execute(async (trx) => {
        await trx
          .insertInto('adjudicatorImportSession')
          .values({
            sessionId: importSession.id,
            tournamentId: importSession.tournamentId,
            createdAt: importSession.createdAt,
            updatedAt: importSession.updatedAt,
            origin: castJson(importSession.origin),
            headers: castJson(importSession.headers),
            status: importSession.status,
            errorDetail:
              importSession.status === 'missing-entities'
                ? castJson(importSession.error)
                : null,
          })
          .onConflict((oc) =>
            oc.columns(['sessionId']).doUpdateSet({
              tournamentId: (eb) => eb.ref('excluded.tournamentId'),
              createdAt: (eb) => eb.ref('excluded.createdAt'),
              updatedAt: (eb) => eb.ref('excluded.updatedAt'),
              origin: (eb) => eb.ref('excluded.origin'),
              headers: (eb) => eb.ref('excluded.headers'),
              status: (eb) => eb.ref('excluded.status'),
              errorDetail: (eb) => eb.ref('excluded.errorDetail'),
            }),
          )
          .executeTakeFirst();
        await trx
          .deleteFrom('importAdjudicatorRow')
          .where('sessionId', '=', importSession.id)
          .execute();
        await trx
          .insertInto('importAdjudicatorRow')
          .values(
            importSession.rows.map((row, seq) => ({
              sessionId: importSession.id,
              seq,
              raw: castJson(row.raw),
              success: row.success,
              error: row.success ? null : row.error,
              parsed: row.success ? castJson(row.parsed) : null,
              matched: row.success ? row.matched : null,
              updateNecessity: row.success
                ? castJson(row.updateNecessity)
                : null,
              duplication: row.success ? castJson(row.duplication) : null,
              doImport: row.success ? row.doImport : null,
            })),
          )
          .execute();
      });
      return ok();
    } catch (error) {
      console.error(error);
      return err(
        new SaveFailedError(
          `Failed to save adjudicator import session ${importSession.id} for tournament ${importSession.tournamentId}.`,
        ),
      );
    }
  }

  async delete(
    importSession: AdjudicatorImportSession,
  ): Promise<Result<void, NotFoundError>> {
    const deleted = await this.db
      .deleteFrom('adjudicatorImportSession')
      .where('sessionId', '=', importSession.id)
      .executeTakeFirst();
    if (deleted.numDeletedRows === 0n) {
      return err(
        new NotFoundError(
          `Adjudicator import session ${importSession.id} not found in tournament ${importSession.tournamentId}.`,
        ),
      );
    }
    return ok();
  }
}
