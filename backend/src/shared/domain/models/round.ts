import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { BreakCategoryId } from './break-category';
import { Enumify } from 'src/lib/enum';
declare const roundSymbol: unique symbol;
declare const roundIdSymbol: unique symbol;

export type RoundId = Branded<number, typeof roundIdSymbol>;

export const RoundStage = {
  Preliminary: 'P',
  Elimination: 'E',
} as const;

export type RoundStage = Enumify<typeof RoundStage>;

export const RoundDrawType = {
  Random: 'R',
  Manual: 'M',
  RoundRobin: 'D',
  PowerPaired: 'P',
  Elimination: 'E',
  Seeded: 'S',
} as const;

export type RoundDrawType = Enumify<typeof RoundDrawType>;

export const RoundDrawStatus = {
  None: 'N',
  Draft: 'D',
  Confirmed: 'C',
  TeamsReleased: 'T',
  Released: 'R',
} as const;

export type RoundDrawStatus = Enumify<typeof RoundDrawStatus>;

export const RoundMotionsStatus = {
  NotReleased: 'N',
  InfoSlidesReleased: 'I',
  MotionsReleased: 'M',
} as const;

export type RoundMotionsStatus = Enumify<typeof RoundMotionsStatus>;

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
