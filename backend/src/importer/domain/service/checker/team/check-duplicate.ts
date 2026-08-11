import {
  TeamImport,
  TeamDuplicationStatus,
  TeamDuplicationReason,
  TeamMatchStatus,
} from '@importer/domain/values';
import { match, P } from 'ts-pattern';

export const checkTeamDuplicates = (
  input: {
    teamImport: TeamImport;
    match: TeamMatchStatus;
  }[],
): TeamDuplicationStatus[] => {
  const referenceDuplicationReasons = checkDuplicatesWithSameReference(
    input.map((i) => i.teamImport),
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
      .returnType<TeamDuplicationStatus>()
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
export const checkDuplicatesWithSameReference = (
  imports: TeamImport[],
): { row: number; reason: TeamDuplicationReason }[] => {
  const groupedImports = Map.groupBy(
    imports.map((value, index) => ({ value, index })),
    ({ value }) => value.reference,
  );
  return [...groupedImports.entries()].flatMap(([reference, group]) => {
    if (group.length < 2) {
      return [];
    }
    const indices = new Set(group.map(({ index }) => index));
    return group.map(({ index }) => ({
      row: index,
      reason: {
        type: 'sameReference',
        reference,
        indices: [...indices.difference(new Set([index]))],
      },
    }));
  });
};

/**
 * Check for matches that point to the same existing team (two rows should not point to the same existing team; in such case whether to update or not becomes ambiguous)
 * @param matches
 * @returns An array of found duplicates.
 */
export const checkDuplicatesWithSameMatch = (
  matches: TeamMatchStatus[],
): { row: number; reason: TeamDuplicationReason }[] => {
  const groupedMatches = Map.groupBy(
    matches
      .map((value, index) => ({ value, index }))
      .filter(
        (
          input,
        ): input is {
          value: Exclude<TeamMatchStatus, { existing: null }>;
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
        teamId: matchedId,
        indices: [...indices.difference(new Set([index]))].sort(),
      },
    }));
  });
};

// const checkDuplicatesWithSameSpeakers;
