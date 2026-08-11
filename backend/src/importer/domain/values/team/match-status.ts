import { TeamDto, TeamSpeakerDto } from '@shared/infrastructure/query';

export type SpeakerMatchedBy = {
  id: boolean;
  name: boolean;
  email: boolean;
};

export type SpeakerMatchStatus<T extends TeamSpeakerDto = TeamSpeakerDto> =
  | {
      existing: null;
    }
  | {
      existing: T;
      matchedBy: SpeakerMatchedBy;
    };

export type TeamMatchedBy = {
  id: boolean;
  reference: boolean;
  speakers: {
    matched: number;
    total: number;
  };
};

export type TeamMatchStatus =
  | {
      existing: null;
    }
  | {
      existing: TeamDto;
      matchedBy: TeamMatchedBy;
      speakers: SpeakerMatchStatus[];
    };
