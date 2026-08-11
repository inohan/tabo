export type AdjudicatorDuplicationReason =
  | {
      type: 'sameName';
      name: string;
      indices: number[];
    }
  | {
      type: 'sameMatch';
      adjudicatorId: number;
      indices: number[];
    };

export type AdjudicatorDuplicationStatus =
  | {
      hasDuplicate: false;
    }
  | {
      hasDuplicate: true;
      reasons: AdjudicatorDuplicationReason[];
    };

export type SerializedAdjudicatorDuplicationStatus =
  | {
      hasDuplicate: false;
    }
  | {
      hasDuplicate: true;
      reasons: string[];
    };
