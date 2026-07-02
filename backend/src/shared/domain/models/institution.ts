import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
declare const institutionSymbol: unique symbol;
declare const institutionIdSymbol: unique symbol;

export type InstitutionId = Branded<number, typeof institutionIdSymbol>;

export type Institution = Branded<
  {
    readonly id: InstitutionId;
    readonly tournamentId: TournamentId;
    name: string;
    code: string;
  },
  typeof institutionSymbol
>;

export const InstitutionId = {
  ...Struct<InstitutionId>(),
};

export const Institution = {
  ...Struct<Institution>(),
};
