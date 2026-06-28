import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { BreakCategoryId } from './break-category';
declare const roundSymbol: unique symbol;
declare const roundIdSymbol: unique symbol;

export type RoundId = Branded<number, typeof roundIdSymbol>;

export enum RoundStage {
  Preliminary = 'P',
  Elimination = 'E',
}

export enum RoundDrawType {
  Random = 'R',
  Manual = 'M',
  RoundRobin = 'D',
  PowerPaired = 'P',
  Elimination = 'E',
  Seeded = 'S',
}

export enum RoundDrawStatus {
  None = 'N',
  Draft = 'D',
  Confirmed = 'C',
  TeamsReleased = 'T',
  Released = 'R',
}

export enum RoundMotionsStatus {
  NotReleased = 'N',
  InfoSlidesReleased = 'I',
  MotionsReleased = 'M',
}

export type Round = Branded<
  {
    readonly id: RoundId;
    readonly tournamentId: TournamentId;
    breakCategory: BreakCategoryId | null;
    displayName: string;
    startsAt: Date | null;
    motionsReleased: boolean;
    seq: number;
    completed: boolean;
    name: string;
    abbreviation: string;
    stage: RoundStage;
    drawType: RoundDrawType;
    drawStatus: RoundDrawStatus;
    feedbackWeight: number;
    silent: boolean;
    motionsStatus: RoundMotionsStatus;
    weight: number;
  },
  typeof roundSymbol
>;

export const RoundId = {
  ...Struct<RoundId>(),
};

export const Round = {
  ...Struct<Round>(),
};
