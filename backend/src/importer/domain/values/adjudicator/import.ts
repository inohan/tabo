export type AdjudicatorImport = {
  id?: number;
  name: string;
  email?: string | null;
  institution: string | null;
  adjCore?: boolean;
  independent?: boolean;
  institutionConflicts?: string[];
};
