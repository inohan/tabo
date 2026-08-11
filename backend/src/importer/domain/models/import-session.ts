import { AdjudicatorId, TeamId, TournamentId } from '@shared/domain';
import { Branded, Struct } from 'src/lib/brand';
import {
  AdjudicatorImport,
  AdjudicatorUpdateNecessity,
  CellValue,
  ImportOrigin,
  SerializedAdjudicatorDuplicationStatus,
  SerializedTeamDuplicationStatus,
  TeamImport,
  TeamUpdateNecessity,
} from '../values';

declare const importSessionIdSymbol: unique symbol;
declare const importSessionSymbol: unique symbol;
declare const importTeamRowSymbol: unique symbol;
declare const importAdjudicatorRowSymbol: unique symbol;

export type ImportTeamRow = Branded<
  {
    raw: CellValue[];
  } & (
    | {
        success: false;
        error: string;
      }
    | {
        success: true;
        parsedTeam: TeamImport;
        matchedTeam: TeamId | null;
        updateNecessity: TeamUpdateNecessity;
        duplication: SerializedTeamDuplicationStatus;
        doImport: boolean;
      }
  ),
  typeof importTeamRowSymbol
>;

export const ImportTeamRow = {
  ...Struct<ImportTeamRow>(),
};

export type ImportAdjudicatorRow = Branded<
  {
    raw: CellValue[];
  } & (
    | {
        success: false;
        error: string;
      }
    | {
        success: true;
        parsedAdjudicator: AdjudicatorImport;
        matchedAdjudicator: AdjudicatorId | null;
        updateNecessity: AdjudicatorUpdateNecessity;
        duplication: SerializedAdjudicatorDuplicationStatus;
        doImport: boolean;
      }
  ),
  typeof importAdjudicatorRowSymbol
>;

export const ImportAdjudicatorRow = {
  ...Struct<ImportAdjudicatorRow>(),
};

export type ImportSessionId = Branded<string, typeof importSessionIdSymbol>;

export const ImportSessionId = {
  ...Struct<ImportSessionId>(),
  create: () => ImportSessionId.init(crypto.randomUUID()),
};

export type ImportSession = Branded<
  {
    sessionId: ImportSessionId;
    tournamentId: TournamentId;
    origin: ImportOrigin;
    headers: (string | null)[];
    // headerMappings: Record<string, string>;
    createdAt: Date;
    updatedAt: Date;
  } & (
    | {
        type: 'team';
        rows: ImportTeamRow[];
      }
    | {
        type: 'adjudicator';
        rows: ImportAdjudicatorRow[];
      }
  ),
  typeof importSessionSymbol
>;

export const ImportSession = {
  ...Struct<ImportSession>(),
  create: (
    params: {
      tournamentId: TournamentId;
      origin: ImportOrigin;
      headers: (string | null)[];
    } & (
      | {
          type: 'team';
          rows: ImportTeamRow[];
        }
      | {
          type: 'adjudicator';
          rows: ImportAdjudicatorRow[];
        }
    ),
  ) => {
    const current = new Date();
    return ImportSession.init({
      sessionId: ImportSessionId.create(),
      createdAt: current,
      updatedAt: current,
      ...params,
    });
  },
};
