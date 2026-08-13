import { AdjudicatorImport } from '@importer/domain/values';
import { AdjudicatorDto } from '@shared/infrastructure/query';
import { matchAdjudicatorImportWithExistingAdjudicators } from './match';
import { getAdjudicatorUpdateNecessity } from './compare';
import { checkAdjudicatorDuplicates } from './check-duplicate';
import { throwUnexpected_ } from 'src/lib/throw';

export { serializeAdjudicatorDuplicationStatus } from './serialize-duplicate';

export const checkAdjudicator = (
  adjudicatorImports: AdjudicatorImport[],
  existingAdjudicators: AdjudicatorDto[],
) => {
  const calculatedRows = adjudicatorImports.map((adjudicatorImport) => {
    const match = matchAdjudicatorImportWithExistingAdjudicators(
      adjudicatorImport,
      existingAdjudicators,
    );
    const updateNecessity = getAdjudicatorUpdateNecessity(
      adjudicatorImport,
      match,
    );
    return {
      adjudicatorImport,
      match,
      updateNecessity,
    };
  });
  const duplicateStatuses = checkAdjudicatorDuplicates(calculatedRows);
  return calculatedRows.map((calculatedRow, index) => ({
    ...calculatedRow,
    duplicateStatus: duplicateStatuses[index] ?? throwUnexpected_(),
  }));
};
