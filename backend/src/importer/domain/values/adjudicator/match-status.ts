import { AdjudicatorDto } from '@shared/infrastructure/query';

export type AdjudicatorMatchedBy = {
  id: boolean;
  name: boolean;
  email: boolean;
};

export type AdjudicatorMatchStatus =
  | {
      existing: null;
    }
  | {
      existing: AdjudicatorDto;
      matchedBy: AdjudicatorMatchedBy;
    };
