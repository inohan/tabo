import {
  BreakCategoryDto,
  SpeakerCategoryDto,
} from '@shared/infrastructure/query';

/**
 * Gets all break categories that must be newly imported (=not existing)
 * @param imports The name of break categories to be imported
 * @param existing Existing break categories
 * @param options Additional options
 * @returns List of break category slug names that must be newly imported, with duplicates removed and in ascending order.
 */
export const getMissingBreakCategories = (
  imports: string[],
  existing: BreakCategoryDto[],
  options?: {
    /**
     * Whether the matching should be case sensitive. Defaults to `true`.
     */
    caseSensitive?: boolean;
  },
): string[] => {
  const caseSensitive = options?.caseSensitive ?? true;
  const importInstitutionsWithoutDuplicates = [...new Set(imports)].sort();
  if (caseSensitive) {
    const existingInstitutionCodes = new Set(existing.map((dto) => dto.slug));
    return importInstitutionsWithoutDuplicates.filter(
      (name) => !existingInstitutionCodes.has(name),
    );
  } else {
    const existingInstitutionCodes = new Set(
      existing.map((dto) => dto.slug.toLowerCase()),
    );
    return importInstitutionsWithoutDuplicates.filter(
      (name) => !existingInstitutionCodes.has(name.toLowerCase()),
    );
  }
};

/**
 * Gets all speaker categories that must be newly imported (=not existing)
 * @param imports The name of speaker categories to be imported
 * @param existing Existing speaker categories
 * @param options Additional options
 * @returns List of speaker category slug names that must be newly imported, with duplicates removed and in ascending order.
 */
export const getMissingSpeakerCategories = (
  imports: string[],
  existing: SpeakerCategoryDto[],
  options?: {
    /**
     * Whether the matching should be case sensitive. Defaults to `true`.
     */
    caseSensitive?: boolean;
  },
): string[] => {
  const caseSensitive = options?.caseSensitive ?? true;
  const importInstitutionsWithoutDuplicates = [...new Set(imports)].sort();
  if (caseSensitive) {
    const existingInstitutionCodes = new Set(existing.map((dto) => dto.slug));
    return importInstitutionsWithoutDuplicates.filter(
      (name) => !existingInstitutionCodes.has(name),
    );
  } else {
    const existingInstitutionCodes = new Set(
      existing.map((dto) => dto.slug.toLowerCase()),
    );
    return importInstitutionsWithoutDuplicates.filter(
      (name) => !existingInstitutionCodes.has(name.toLowerCase()),
    );
  }
};
