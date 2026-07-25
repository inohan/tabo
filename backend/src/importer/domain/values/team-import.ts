export type TeamImport = {
  speakers: {
    institution: string | null;
    name: string;
    categories: string[];
    anonymous?: boolean;
    email?: string | null;
    labels?: string[];
  }[];
  institution: string | null;
  reference: string;
  shortReference?: string;
  institutionConflicts?: string[];
  breakCategories: string[];
  emoji?: string | null;
  codeName?: string;
  useInstitutionPrefix?: boolean;
  labels?: string[];
};
