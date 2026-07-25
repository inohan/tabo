export type AdjudicatorImport = {
  name: string;
  email?: string | null;
  institution: string | null;
  adjCore?: boolean;
  independent?: boolean;
  institutionConflicts?: string[];
};
