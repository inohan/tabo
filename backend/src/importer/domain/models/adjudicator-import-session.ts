import { Branded, Struct } from 'src/lib/brand';
import {
  AdjudicatorImport,
  AdjudicatorImportResult,
  AdjudicatorImportSessionFailedMissingEntries,
  AdjudicatorUpdateNecessity,
  CellValue,
  ImportOrigin,
  SerializedAdjudicatorDuplicationStatus,
} from '../values';
import { AdjudicatorId, TournamentId } from '@shared/domain';

export declare const importAdjudicatorRowSymbol: unique symbol;
export declare const adjudicatorImportSessionIdSymbol: unique symbol;
export declare const adjudicatorImportSessionSymbol: unique symbol;

export type AdjudicatorImportRow = Branded<
  {
    raw: CellValue[];
  } & (
    | {
        success: false;
        error: string;
      }
    | {
        success: true;
        parsed: AdjudicatorImport;
        matched: AdjudicatorId | null;
        updateNecessity: AdjudicatorUpdateNecessity;
        duplication: SerializedAdjudicatorDuplicationStatus;
        doImport: boolean;
        importResult?: AdjudicatorImportResult;
      }
  ),
  typeof importAdjudicatorRowSymbol
>;

export const AdjudicatorImportRow = {
  ...Struct<AdjudicatorImportRow>(),
};

export type AdjudicatorImportSessionId = Branded<
  string,
  typeof adjudicatorImportSessionIdSymbol
>;

export const AdjudicatorImportSessionId = {
  ...Struct<AdjudicatorImportSessionId>(),
  create: () => AdjudicatorImportSessionId.init(crypto.randomUUID()),
};

export type AdjudicatorImportSession = Branded<
  {
    id: AdjudicatorImportSessionId;
    tournamentId: TournamentId;
    origin: ImportOrigin;
    headers: (string | null)[];
    rows: AdjudicatorImportRow[];
    createdAt: Date;
    updatedAt: Date;
  } & (
    | {
        status: 'incomplete';
      }
    | {
        status: 'missing-entities';
        error: AdjudicatorImportSessionFailedMissingEntries;
      }
    | {
        status: 'new-adjudicators';
      }
    | {
        status: 'success';
      }
  ),
  typeof adjudicatorImportSessionSymbol
>;

export const AdjudicatorImportSession = {
  ...Struct<AdjudicatorImportSession>(),
  create: (params: {
    tournamentId: TournamentId;
    origin: ImportOrigin;
    headers: (string | null)[];
    rows: AdjudicatorImportRow[];
    missingInstitutions: string[];
  }) => {
    const current = new Date();
    return AdjudicatorImportSession.init({
      id: AdjudicatorImportSessionId.create(),
      createdAt: current,
      updatedAt: current,
      status: 'incomplete',
      ...params,
    });
  },
};
