import { TeamImport } from '@importer/domain/values';
import { TeamDto } from '@shared/infrastructure/query';
import { matchTeamImportWithExistingTeams } from './match';
import { getTeamUpdateNecessity } from './compare';
import { checkTeamDuplicates } from './check-duplicate';
import { throwUnexpected_ } from 'src/lib/throw';

export { serializeTeamDuplicationStatus } from './serialize-duplicate';
export {
  getMissingBreakCategories,
  getMissingSpeakerCategories,
} from './missing-categories';
export const checkTeam = (
  teamImports: TeamImport[],
  existingTeams: TeamDto[],
) => {
  const calculatedRows = teamImports.map((teamImport) => {
    const match = matchTeamImportWithExistingTeams(teamImport, existingTeams);
    const updateNecessity = getTeamUpdateNecessity(teamImport, match);
    return {
      teamImport,
      match,
      updateNecessity,
    };
  });
  const duplicateStatuses = checkTeamDuplicates(calculatedRows);
  return calculatedRows.map((calculatedRow, index) => ({
    ...calculatedRow,
    duplicateStatus: duplicateStatuses[index] ?? throwUnexpected_(),
  }));
};
