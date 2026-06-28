import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
declare const breakCategorySymbol: unique symbol;
declare const breakCategoryIdSymbol: unique symbol;

export type BreakCategoryId = Branded<number, typeof breakCategoryIdSymbol>;

export type BreakCategory = Branded<
  {
    readonly id: BreakCategoryId;
    readonly tournamentId: TournamentId;
    name: string;
    slug: string;
    seq: number;
    breakSize: number;
    reserveSize: number;
    isGeneral: boolean;
    priority: number;
  },
  typeof breakCategorySymbol
>;

export const BreakCategoryId = {
  ...Struct<BreakCategoryId>(),
};

export const BreakCategory = {
  ...Struct<BreakCategory>(),
};
