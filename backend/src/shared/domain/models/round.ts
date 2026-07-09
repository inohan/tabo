import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { BreakCategoryId } from './break-category';
import { Enum } from 'src/lib/enum';
declare const roundSymbol: unique symbol;
declare const roundIdSymbol: unique symbol;

export type RoundId = Branded<number, typeof roundIdSymbol>;

const roundStage = [
  { type: 'P', name: 'Preliminary' },
  { type: 'E', name: 'Elimination' },
] as const;

declare const roundStageSymbol: unique symbol;

export const RoundStage = Enum<typeof roundStage, typeof roundStageSymbol>(
  roundStage,
);
export type RoundStage = Enum<typeof roundStage, typeof roundStageSymbol>;

const roundDrawType = [
  { type: 'R', name: 'Random' },
  { type: 'M', name: 'Manual' },
  { type: 'D', name: 'RoundRobin' },
  { type: 'P', name: 'PowerPaired' },
  { type: 'E', name: 'Elimination' },
  { type: 'S', name: 'Seeded' },
] as const;

declare const roundDrawTypeSymbol: unique symbol;

export const RoundDrawType = Enum<
  typeof roundDrawType,
  typeof roundDrawTypeSymbol
>(roundDrawType);
export type RoundDrawType = Enum<
  typeof roundDrawType,
  typeof roundDrawTypeSymbol
>;

const roundDrawStatus = [
  { type: 'N', name: 'None' },
  { type: 'D', name: 'Draft' },
  { type: 'C', name: 'Confirmed' },
  { type: 'T', name: 'TeamsReleased' },
  { type: 'R', name: 'Released' },
] as const;

declare const roundDrawStatusSymbol: unique symbol;

export const RoundDrawStatus = Enum<
  typeof roundDrawStatus,
  typeof roundDrawStatusSymbol
>(roundDrawStatus);
export type RoundDrawStatus = Enum<
  typeof roundDrawStatus,
  typeof roundDrawStatusSymbol
>;

const roundMotionsStatus = [
  { type: 'N', name: 'NotReleased' },
  { type: 'I', name: 'InfoSlidesReleased' },
  { type: 'M', name: 'MotionsReleased' },
] as const;

declare const roundMotionsStatusSymbol: unique symbol;

export const RoundMotionsStatus = Enum<
  typeof roundMotionsStatus,
  typeof roundMotionsStatusSymbol
>(roundMotionsStatus);
export type RoundMotionsStatus = Enum<
  typeof roundMotionsStatus,
  typeof roundMotionsStatusSymbol
>;

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
