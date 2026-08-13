import { InstitutionDto } from '@shared/infrastructure/query';

/**
 * Gets all institutions that must be newly imported (=not existing in existing institutions)
 * @param imports The name of institutions to be imported
 * @param existing Existing institutions
 * @param options Additional options
 * @returns List of institution code names that must be newly imported, with duplicates removed and in ascending order.
 */
export const getMissingInstitutions = (
  imports: string[],
  existing: InstitutionDto[],
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
    const existingInstitutionCodes = new Set(existing.map((dto) => dto.code));
    return importInstitutionsWithoutDuplicates.filter(
      (name) => !existingInstitutionCodes.has(name),
    );
  } else {
    const existingInstitutionCodes = new Set(
      existing.map((dto) => dto.code.toLowerCase()),
    );
    return importInstitutionsWithoutDuplicates.filter(
      (name) => !existingInstitutionCodes.has(name.toLowerCase()),
    );
  }
};
