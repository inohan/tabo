import {
  PartialFailedError,
  SpeakerId,
  TeamId,
  TournamentId,
} from '@shared/domain';
import { Branded, Struct } from 'src/lib/brand';
import {
  CellValue,
  ImportOrigin,
  SerializedTeamDuplicationStatus,
  TeamImport,
  TeamImportResult,
  TeamImportSessionFailedMissingEntities,
  TeamMatchStatus,
  TeamUpdateNecessity,
} from '../values';
import { match } from 'ts-pattern';
import { TabbycatError } from '@shared/clients/tabbycat';
import { throwUnexpected_ } from 'src/lib/throw';
import { err, ok, Result } from 'neverthrow';
import { InvalidImportSessionStateError } from '../error';

export declare const teamImportSessionIdSymbol: unique symbol;
export declare const teamImportSessionSymbol: unique symbol;
export declare const importTeamRowSymbol: unique symbol;

export type TeamImportRow = Branded<
  {
    raw: CellValue[];
  } & (
    | {
        success: false;
        error: string;
      }
    | {
        success: true;
        parsed: TeamImport;
        matched: TeamMatchStatus;
        updateNecessity: TeamUpdateNecessity;
        duplication: SerializedTeamDuplicationStatus;
        doImport: boolean;
        importResult?: TeamImportResult;
      }
  ),
  typeof importTeamRowSymbol
>;

export const TeamImportRow = {
  ...Struct<TeamImportRow>(),

  setDoImport: (
    row: Extract<TeamImportRow, { success: true }>,
    doImport: boolean,
  ) =>
    TeamImportRow.init({
      ...row,
      doImport,
    }),

  setResult: (
    row: Extract<TeamImportRow, { success: true }>,
    result: TeamImportResult,
  ) =>
    TeamImportRow.init({
      ...row,
      importResult: result,
    }),
};

export type TeamImportSessionId = Branded<
  string,
  typeof teamImportSessionIdSymbol
>;

export const TeamImportSessionId = {
  ...Struct<TeamImportSessionId>(),
  create: () => TeamImportSessionId.init(crypto.randomUUID()),
};

export type TeamImportSession = Branded<
  {
    id: TeamImportSessionId;
    tournamentId: TournamentId;
    origin: ImportOrigin;
    headers: (string | null)[];
    rows: TeamImportRow[];
    // headerMappings: Record<string, string>;
    createdAt: Date;
    updatedAt: Date;
  } & (
    | {
        status: 'incomplete';
      }
    | {
        status: 'missing-entities';
        error: TeamImportSessionFailedMissingEntities;
      }
    | {
        status: 'new-teams';
      }
    | {
        status: 'success';
      }
  ),
  typeof teamImportSessionSymbol
>;

export const TeamImportSession = {
  ...Struct<TeamImportSession>(),
  create: (params: {
    tournamentId: TournamentId;
    origin: ImportOrigin;
    headers: (string | null)[];
    rows: TeamImportRow[];
  }) => {
    const current = new Date();
    return TeamImportSession.init({
      id: TeamImportSessionId.create(),
      createdAt: current,
      updatedAt: current,
      status: 'incomplete',
      ...params,
    });
  },

  /**
   * Updates the doImport properties of the rows. Fails when some rows cannot be updated, such as out-of-bounds / duplicate indices, non-parsed rows, etc.
   * @param session
   * @param updates
   */
  updateDoImport: (
    session: TeamImportSession,
    updates: readonly { index: number; doImport: boolean }[],
  ): Result<TeamImportSession, InvalidImportSessionStateError> => {
    if (updates.length === 0) {
      return ok(session);
    }
    // Duplicates
    const duplicateIndices = [
      ...Map.groupBy(updates, (update) => update.index).entries(),
    ]
      .filter(([, grouped]) => grouped.length >= 2)
      .map(([index]) => index);
    if (duplicateIndices.length) {
      return err(
        new InvalidImportSessionStateError(
          `There are multiple updates with the same index: ${duplicateIndices.join(', ')}`,
        ),
      );
    }
    const updateMap = new Map(
      updates.map((update) => [update.index, update.doImport]),
    );
    const popUpdateMap = (index: number) => {
      const value = updateMap.get(index);
      updateMap.delete(index);
      return value;
    };
    const updated = TeamImportSession.init({
      ...session,
      updatedAt: new Date(),
      rows: session.rows.map((row, rowIndex) => {
        const updatedValue = popUpdateMap(rowIndex);
        if (updatedValue === undefined || !row.success) {
          return row;
        }
        return TeamImportRow.setDoImport(row, updatedValue);
      }),
    });
    // Check for untouched updates
    if (updateMap.size) {
      return err(
        new InvalidImportSessionStateError(
          `The following updates could not be resolved: ${[...updateMap.entries()].map(([index, value]) => `{index: ${index}, doUpdate: ${value}`).join(', ')}`,
        ),
      );
    }
    return ok(updated);
  },

  updateStatusMissingEntities: (
    session: TeamImportSession,
    reason: TeamImportSessionFailedMissingEntities,
  ): Result<TeamImportSession, InvalidImportSessionStateError> => {
    if (session.status !== 'incomplete') {
      return err(
        new InvalidImportSessionStateError(
          `Team import session state cannot be changed from ${session.status} to "missing-entities"`,
        ),
      );
    }
    return ok(
      TeamImportSession.init({
        ...session,
        status: 'missing-entities',
        updatedAt: new Date(),
        error: reason,
      }),
    );
  },

  updateStatusNewTeams: (
    session: TeamImportSession,
    partialFailure: PartialFailedError<
      { id: TeamId; speakerIds: SpeakerId[] },
      TabbycatError
    >,
  ): Result<TeamImportSession, InvalidImportSessionStateError> => {
    if (session.status !== 'incomplete') {
      return err(
        new InvalidImportSessionStateError(
          `Team import session state cannot be changed from ${session.status} to "new-teams"`,
        ),
      );
    }
    let filteredIndex = 0;
    return ok(
      TeamImportSession.init({
        ...session,
        status: 'new-teams',
        updatedAt: new Date(),
        rows: session.rows.map((row) =>
          match(row)
            .returnType<TeamImportRow>()
            // Parsed rows
            .with({ success: true }, (row) =>
              TeamImportRow.setResult(
                row,
                (
                  partialFailure.cause[filteredIndex++] ?? throwUnexpected_()
                ).match<TeamImportResult>(
                  ({ id, speakerIds }) => ({
                    success: true,
                    teamId: id,
                    speakerIds: speakerIds,
                  }),
                  (e) => ({
                    success: false,
                    reason: e.message,
                  }),
                ),
              ),
            )
            // Unparsed rows
            .with({ success: false }, (row) => row)
            .exhaustive(),
        ),
      }),
    );
  },

  updateStatusSuccess: (
    session: TeamImportSession,
    results: {
      id: TeamId;
      speakerIds: SpeakerId[];
    }[],
  ): Result<TeamImportSession, InvalidImportSessionStateError> => {
    if (session.status !== 'incomplete') {
      return err(
        new InvalidImportSessionStateError(
          `Team import session state cannot be changed from ${session.status} to "success"`,
        ),
      );
    }
    let filteredIndex = 0;
    return ok(
      TeamImportSession.init({
        ...session,
        status: 'success',
        updatedAt: new Date(),
        rows: session.rows.map((row) =>
          match(row)
            .returnType<TeamImportRow>()
            .with({ success: true }, (row) => {
              const importResult =
                results[filteredIndex++] ?? throwUnexpected_();
              return TeamImportRow.setResult(row, {
                success: true,
                teamId: importResult.id,
                speakerIds: importResult.speakerIds,
              });
            })
            .with({ success: false }, (row) => row)
            .exhaustive(),
        ),
      }),
    );
  },
};
