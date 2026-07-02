import { Branded, Struct } from 'src/lib/brand';

declare const tournamentSymbol: unique symbol;
declare const tournamentIdSymbol: unique symbol;

export type TournamentId = Branded<string, typeof tournamentIdSymbol>;

export type Tournament = Branded<
  {
    readonly tournamentId: TournamentId;
    readonly baseUrl: string;
    readonly id: number;
    readonly token: string;
    slug: string;
    name: string;
    shortName: string;
  },
  typeof tournamentSymbol
>;

export const TournamentId = {
  ...Struct<TournamentId>(),
  create: (): TournamentId => TournamentId.init(crypto.randomUUID()),
};

export const Tournament = {
  ...Struct<Tournament>(),
  create: ({
    baseUrl,
    name,
    id,
    slug,
    shortName,
    token,
  }: {
    baseUrl: string;
    id: number;
    name: string;
    slug: string;
    shortName: string;
    token: string;
  }): Tournament =>
    Tournament.init({
      tournamentId: TournamentId.create(),
      baseUrl,
      id,
      name,
      slug,
      shortName,
      token,
    }),
};
