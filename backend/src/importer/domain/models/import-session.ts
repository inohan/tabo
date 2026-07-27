import { TournamentId } from '@shared/domain';
import { Branded, Struct } from 'src/lib/brand';
import {
  AdjudicatorImport,
  CellValue,
  ImportOrigin,
  TeamImport,
} from '../values';

declare const importSessionSymbol: unique symbol;
declare const importTeamRowSymbol: unique symbol;
declare const importAdjudicatorRowSymbol: unique symbol;

export type ImportTeamRow = Branded<
  {
    raw: CellValue[];
  } & (
    | {
        success: false;
        error: Error;
      }
    | {
        success: true;
        parsedTeam: TeamImport;
        classification: 'existing' | 'update' | 'new';
      }
  ),
  typeof importTeamRowSymbol
>;

export type ImportAdjudicatorRow = Branded<
  {
    raw: CellValue[];
  } & (
    | {
        success: false;
        error: Error;
      }
    | {
        success: true;
        parsedTeam: AdjudicatorImport;
        classification: 'existing' | 'update' | 'new';
      }
  ),
  typeof importAdjudicatorRowSymbol
>;

export type ImportSession = Branded<
  {
    tournamentId: TournamentId;
    origin: ImportOrigin;
    headers: (string | null)[];
    // headerMappings: Record<string, string>;
    createdAt: Date;
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

const ImportTeamRow = {
  ...Struct<ImportTeamRow>(),
};

const ImportAdjudicatorRow = {
  ...Struct<ImportAdjudicatorRow>(),
};

const ImportSession = {
  ...Struct<ImportSession>(),
};
