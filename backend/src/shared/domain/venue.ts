import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
declare const venueSymbol: unique symbol;
declare const venueIdSymbol: unique symbol;

export type VenueId = Branded<number, typeof venueIdSymbol>;

export type Venue = Branded<
  {
    readonly id: VenueId;
    readonly tournamentId: TournamentId;
    name: string;
    readonly displayName: string;
    priority: number;
  },
  typeof venueSymbol
>;

export const VenueId = {
  ...Struct<VenueId>(),
};

export const Venue = {
  ...Struct<Venue>(),
};
