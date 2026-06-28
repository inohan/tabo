import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { SpeakerId } from './speaker';
import { InstitutionId } from './institution';
import { BreakCategoryId } from './break-category';
declare const teamSymbol: unique symbol;
declare const teamIdSymbol: unique symbol;

export type TeamId = Branded<number, typeof teamIdSymbol>;

export type Team = Branded<
  {
    readonly id: TeamId;
    readonly tournamentId: TournamentId;
    reference: string;
    shortReference: string;
    institutionId: InstitutionId | null;
    institutionConflicts: InstitutionId[];
    readonly speakers: SpeakerId[];
    breakCategories: BreakCategoryId[];
    emoji: string | null;
    codeName: string;
    useInstitutionPrefix: boolean;
    readonly shortName: string;
    readonly longName: string;
  },
  typeof teamSymbol
>;

export const TeamId = {
  ...Struct<TeamId>(),
};

export const Team = {
  ...Struct<Team>(),
};
