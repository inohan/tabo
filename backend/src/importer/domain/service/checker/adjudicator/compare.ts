import {
  AdjudicatorImport,
  AdjudicatorMatchStatus,
  AdjudicatorUpdateNecessity,
} from '@importer/domain/values';

export const getAdjudicatorUpdateNecessity = (
  adjudicatorImport: AdjudicatorImport,
  matched: AdjudicatorMatchStatus,
): AdjudicatorUpdateNecessity => {
  if (matched.existing === null) {
    return {
      adjudicator: 'new',
    };
  }
  //TODO: Update logic to determine whether an update is needed.
  console.info('Update determination logic is not implemented.');
  return {
    adjudicator: 'match',
  };
};
