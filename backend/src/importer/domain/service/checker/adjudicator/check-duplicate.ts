import {
  AdjudicatorImport,
  AdjudicatorDuplicationStatus,
  AdjudicatorDuplicationReason,
  AdjudicatorMatchStatus,
} from '@importer/domain/values';
import { match, P } from 'ts-pattern';

export const checkAdjudicatorDuplicates = (
  input: {
    adjudicatorImport: AdjudicatorImport;
    match: AdjudicatorMatchStatus;
  }[],
): AdjudicatorDuplicationStatus[] => {
  const referenceDuplicationReasons = checkDuplicatesWithSameName(
    input.map((i) => i.adjudicatorImport),
  );
  const matchDuplicationReasons = checkDuplicatesWithSameMatch(
    input.map((i) => i.match),
  );
  const allReasons = [
    ...referenceDuplicationReasons,
    ...matchDuplicationReasons,
  ];
  const reasonsGrouped = Map.groupBy(allReasons, ({ row }) => row);
  return input.map((_, rowIndex) =>
    match(reasonsGrouped.get(rowIndex))
      .returnType<AdjudicatorDuplicationStatus>()
      .with(P.nonNullable, (reasonsWithIndex) => ({
        hasDuplicate: true,
        reasons: reasonsWithIndex.map(({ reason }) => reason),
      }))
      .otherwise(() => ({
        hasDuplicate: false,
      })),
  );
};

/**
 * Checks for imports with the same reference
 * @param imports
 * @returns An array of found duplicates
 */
export const checkDuplicatesWithSameName = (
  imports: AdjudicatorImport[],
): { row: number; reason: AdjudicatorDuplicationReason }[] => {
  const groupedImports = Map.groupBy(
    imports.map((value, index) => ({ value, index })),
    ({ value }) => value.name,
  );
  return [...groupedImports.entries()].flatMap(([name, group]) => {
    if (group.length < 2) {
      return [];
    }
    const indices = new Set(group.map(({ index }) => index));
    return group.map(({ index }) => ({
      row: index,
      reason: {
        type: 'sameName',
        name,
        indices: [...indices.difference(new Set([index]))],
      } satisfies AdjudicatorDuplicationReason,
    }));
  });
};

/**
 * Check for matches that point to the same existing adjudicator (two rows should not point to the same existing adjudicator; in such case whether to update or not becomes ambiguous)
 * @param matches
 * @returns An array of found duplicates.
 */
export const checkDuplicatesWithSameMatch = (
  matches: AdjudicatorMatchStatus[],
): { row: number; reason: AdjudicatorDuplicationReason }[] => {
  const groupedMatches = Map.groupBy(
    matches
      .map((value, index) => ({ value, index }))
      .filter(
        (
          input,
        ): input is {
          value: Exclude<AdjudicatorMatchStatus, { existing: null }>;
          index: number;
        } => input.value.existing !== null,
      ),
    ({ value }) => value.existing.id,
  );
  return [...groupedMatches.entries()].flatMap(([matchedId, group]) => {
    if (group.length < 2) {
      return [];
    }
    const indices = new Set(group.map(({ index }) => index));
    return group.map(({ index }) => ({
      row: index,
      reason: {
        type: 'sameMatch',
        adjudicatorId: matchedId,
        indices: [...indices.difference(new Set([index]))].sort(),
      },
    }));
  });
};

// const checkDuplicatesWithSameSpeakers;
