import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { TeamId } from './team';
import { InstitutionId } from './institution';
import { SpeakerCategoryId } from './speaker-category';
declare const speakerSymbol: unique symbol;
declare const speakerIdSymbol: unique symbol;

export type SpeakerId = Branded<number, typeof speakerIdSymbol>;

export type Speaker = Branded<
  {
    readonly id: SpeakerId;
    readonly tournamentId: TournamentId;
    name: string;
    institutionId: InstitutionId | null;
    teamId: TeamId;
    categories: SpeakerCategoryId[];
    anonymous: boolean;
    email: string | null;
  },
  typeof speakerSymbol
>;

export const SpeakerId = {
  ...Struct<SpeakerId>(),
};

export const Speaker = {
  ...Struct<Speaker>(),
};
