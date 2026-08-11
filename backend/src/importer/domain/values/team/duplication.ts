export type TeamDuplicationReason =
  | {
      type: 'sameReference';
      reference: string;
      indices: number[];
    }
  | {
      type: 'sameMatch';
      teamId: number;
      indices: number[];
    };

export type TeamDuplicationStatus =
  | {
      hasDuplicate: false;
    }
  | {
      hasDuplicate: true;
      reasons: TeamDuplicationReason[];
    };

export type SerializedTeamDuplicationStatus =
  | {
      hasDuplicate: false;
    }
  | {
      hasDuplicate: true;
      reasons: string[];
    };
