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
  TeamUpdateNecessity,
} from '../values';
import { match } from 'ts-pattern';
import { TabbycatError } from '@shared/clients/tabbycat';
import { throwUnexpected_ } from 'src/lib/throw';

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
        matched: TeamId | null;
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
    missingInstitutions: string[];
    missingBreakCategories: string[];
    missingSpeakerCategories: string[];
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
    missingInstitutions: string[];
    missingBreakCategories: string[];
    missingSpeakerCategories: string[];
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

  updateStatusMissingEntities: (
    session: TeamImportSession,
    reason: TeamImportSessionFailedMissingEntities,
  ) =>
    TeamImportSession.init({
      ...session,
      status: 'missing-entities',
      error: reason,
      updatedAt: new Date(),
    }),

  updateStatusNewTeams: (
    session: TeamImportSession,
    partialFailure: PartialFailedError<
      { id: TeamId; speakerIds: SpeakerId[] },
      TabbycatError
    >,
  ) => {
    let filteredIndex = 0;
    return TeamImportSession.init({
      ...session,
      status: 'new-teams',
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
    });
  },

  updateStatusSuccess: (
    session: TeamImportSession,
    results: {
      id: TeamId;
      speakerIds: SpeakerId[];
    }[],
  ) => {
    let filteredIndex = 0;
    return TeamImportSession.init({
      ...session,
      status: 'success',
      rows: session.rows.map((row) =>
        match(row)
          .returnType<TeamImportRow>()
          .with({ success: true }, (row) => {
            const importResult = results[filteredIndex++] ?? throwUnexpected_();
            return TeamImportRow.setResult(row, {
              success: true,
              teamId: importResult.id,
              speakerIds: importResult.speakerIds,
            });
          })
          .with({ success: false }, (row) => row)
          .exhaustive(),
      ),
    });
  },
};
