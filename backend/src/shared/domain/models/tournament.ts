import { Branded, Struct } from 'src/lib/brand';

declare const tournamentSymbol: unique symbol;
declare const tournamentIdSymbol: unique symbol;

export type TournamentId = Branded<string, typeof tournamentIdSymbol>;

export type Tournament = Branded<
  {
    readonly id: TournamentId;
    readonly baseUrl: string;
    readonly tabId: number;
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
    tabId,
    slug,
    shortName,
  }: {
    baseUrl: string;
    tabId: number;
    name: string;
    slug: string;
    shortName: string;
  }): Tournament =>
    Tournament.init({
      id: TournamentId.create(),
      baseUrl,
      tabId,
      name,
      slug,
      shortName,
    }),
};
