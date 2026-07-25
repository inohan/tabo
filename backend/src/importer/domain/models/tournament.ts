import { TournamentId } from '@shared/domain';
import { Branded, Struct } from 'src/lib/brand';

declare const tournamentSymbol: unique symbol;

export type Tournament = Branded<
  {
    tournamentId: TournamentId;
  },
  typeof tournamentSymbol
>;

export const Tournament = {
  ...Struct<Tournament>(),
};
