export type SpeakerImport = {
  id?: number;
  institution: string | null;
  name: string;
  categories: string[];
  anonymous?: boolean;
  email?: string | null;
  labels?: string[];
};

export type TeamImport = {
  id?: number;
  speakers: SpeakerImport[];
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
