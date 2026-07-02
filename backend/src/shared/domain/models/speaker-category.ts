import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
declare const speakerCategorySymbol: unique symbol;
declare const speakerCategoryIdSymbol: unique symbol;

export type SpeakerCategoryId = Branded<number, typeof speakerCategoryIdSymbol>;

export type SpeakerCategory = Branded<
  {
    readonly id: SpeakerCategoryId;
    readonly tournamentId: TournamentId;
    name: string;
    slug: string;
    seq: number;
  },
  typeof speakerCategorySymbol
>;

export const SpeakerCategoryId = {
  ...Struct<SpeakerCategoryId>(),
};

export const SpeakerCategory = {
  ...Struct<SpeakerCategory>(),
};
