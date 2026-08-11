import {
  AdjudicatorImport,
  AdjudicatorMatchStatus,
} from '@importer/domain/values';
import { AdjudicatorDto } from '@shared/infrastructure/query';
import { match, P } from 'ts-pattern';

/**
 * Matches the imports against existing AdjudicatorDto using id and reference
 * @param imports
 * @param existing
 */
export const matchAdjudicatorImportWithExistingAdjudicators = (
  adjudicatorImport: AdjudicatorImport,
  existing: AdjudicatorDto[],
): AdjudicatorMatchStatus => {
  const matchResult = {
    byId:
      adjudicatorImport.id !== undefined
        ? (existing.find((dto) => dto.id === adjudicatorImport.id) ?? null)
        : undefined,
    //TODO: implement logic to return null when there are multiple
    byName: existing.find((dto) => dto.name === adjudicatorImport.name) ?? null,
    byEmail:
      adjudicatorImport.email != undefined
        ? (existing.find((dto) => dto.email === adjudicatorImport.email) ??
          null)
        : undefined,
  };
  return match(matchResult)
    .returnType<AdjudicatorMatchStatus>()
    .with({ byId: null }, () => ({
      existing: null,
    }))
    .with(
      P.union(
        { byId: P.nonNullable },
        { byName: P.nonNullable },
        { byEmail: P.nonNullable },
      ),
      (matchResult) => {
        const matchedAdjudicator =
          matchResult.byId ?? matchResult.byName ?? matchResult.byEmail!;
        return {
          existing: matchedAdjudicator,
          matchedBy: {
            id: matchResult.byId?.id === matchedAdjudicator.id,
            name: matchResult.byName?.id === matchedAdjudicator.id,
            email: matchResult.byEmail?.id === matchedAdjudicator.id,
          },
        };
      },
    )
    .otherwise(() => ({
      existing: null,
    }));
};
