import { TournamentId } from '@shared/domain';
import { Branded, Struct, Unbranded } from 'src/lib/brand';
import {
  AdjudicatorImport,
  CellValue,
  ImportOrigin,
  TeamImport,
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
        classification: 'existing' | 'update' | 'new';
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
        classification: 'existing' | 'update' | 'new';
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
