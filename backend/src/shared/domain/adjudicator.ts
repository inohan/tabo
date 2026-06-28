import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { InstitutionId } from './institution';
declare const adjudicatorSymbol: unique symbol;
declare const adjudicatorIdSymbol: unique symbol;

export type AdjudicatorId = Branded<number, typeof adjudicatorIdSymbol>;

export type Adjudicator = Branded<
  {
    readonly id: AdjudicatorId;
    readonly tournamentId: TournamentId;
    name: string;
    institutionId: InstitutionId | null;
    breaking: boolean;
    independent: boolean;
    adjCore: boolean;
  },
  typeof adjudicatorSymbol
>;

export const AdjudicatorId = {
  ...Struct<AdjudicatorId>(),
};

export const Adjudicator = {
  ...Struct<Adjudicator>(),
};
