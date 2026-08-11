import {
  TeamImport,
  TeamMatchStatus,
  TeamUpdateNecessity,
} from '@importer/domain/values';

export const getTeamUpdateNecessity = (
  teamImport: TeamImport,
  matched: TeamMatchStatus,
): TeamUpdateNecessity => {
  if (matched.existing === null) {
    return {
      team: 'new',
    };
  }
  //TODO: Update logic to determine whether an update is needed.
  console.info('Update determination logic is not implemented.');
  return {
    team: 'match',
  };
};
