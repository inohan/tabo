import {
  TeamImport,
  SpeakerMatchStatus,
  TeamMatchStatus,
  SpeakerImport,
} from '@importer/domain/values';
import {
  SpeakerDto,
  TeamDto,
  TeamSpeakerDto,
} from '@shared/infrastructure/query';
import { match, P } from 'ts-pattern';

export const matchSpeakerImportWithExistingSpeakers = <
  T extends TeamSpeakerDto,
>(
  speakerImport: SpeakerImport,
  existing: T[],
): SpeakerMatchStatus<T> => {
  // Workaround for match().with() not properly functioning with a generic type T
  const matchResult = {
    byId:
      speakerImport.id !== undefined
        ? (existing.find((dto) => dto.id === speakerImport.id) ?? null)
        : undefined,
    //TODO: implement logic to return null when there are multiple
    byName: existing.find((dto) => dto.name === speakerImport.name) ?? null,
    byEmail:
      speakerImport.email != undefined
        ? (existing.find((dto) => dto.email === speakerImport.email) ?? null)
        : undefined,
  } as {
    byId: TeamSpeakerDto | null | undefined;
    byName: TeamSpeakerDto | null;
    byEmail: TeamSpeakerDto | null | undefined;
  };
  return (
    match(matchResult)
      // If an id is provided but cannot be found, skip any other checks
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
          const matched =
            matchResult.byId ?? matchResult.byName ?? matchResult.byEmail!;
          return {
            existing: matched as T,
            matchedBy: {
              id: matchResult.byId?.id === matched.id,
              name: matchResult.byName?.id === matched.id,
              email: matchResult.byEmail?.id === matched.id,
            },
          };
        },
      )
      .otherwise(() => ({
        existing: null,
      }))
  );
};

/**
 * Matches the imports against existing TeamDto using id and reference
 * @param imports
 * @param existing
 */
export const matchTeamImportWithExistingTeams = (
  teamImport: TeamImport,
  existing: TeamDto[],
): TeamMatchStatus => {
  const speakerDtos = existing.flatMap((team) =>
    team.speakers.map(
      (spk) =>
        ({
          ...spk,
          team: team.id,
          tournamentId: team.tournamentId,
        }) satisfies SpeakerDto,
    ),
  );
  const matchAllSpeakersResult = teamImport.speakers.map((spk) =>
    matchSpeakerImportWithExistingSpeakers(spk, speakerDtos),
  );
  const matchResult = {
    byId:
      teamImport.id !== undefined
        ? (existing.find((dto) => dto.id === teamImport.id) ?? null)
        : undefined,
    // FIXME: When useInstitutionPrefix is enabled, many teams with same reference will exist (e.g. Tokyo A vs Kyoto A)
    byReference:
      existing.find((dto) => dto.reference === teamImport.reference) ?? null,
    // TODO: add bySpeaker with majority voting system
  };
  return match(matchResult)
    .returnType<TeamMatchStatus>()
    .with({ byId: null }, () => ({
      existing: null,
    }))
    .with(
      P.union({ byId: P.nonNullable }, { byReference: P.nonNullable }),
      (matchResult) => {
        const matchedTeam = matchResult.byId ?? matchResult.byReference!;
        // matchAllSpeakersResult matches against all speakers, including from different teams. This filters out the match against the matched team.
        const speakersMatched = matchAllSpeakersResult.map((speakerMatch) => {
          if (
            speakerMatch.existing !== null &&
            speakerMatch.existing.team === matchedTeam.id
          ) {
            return speakerMatch;
          } else {
            return {
              existing: null,
            };
          }
        });
        return {
          existing: matchedTeam,
          matchedBy: {
            id: matchResult.byId?.id === matchedTeam.id,
            reference: matchResult.byReference?.id === matchedTeam.id,
            speakers: {
              matched: speakersMatched.filter(
                (speakerMatched) => speakerMatched.existing !== null,
              ).length,
              total: teamImport.speakers.length,
            },
          },
          speakers: speakersMatched,
        };
      },
    )
    .otherwise(() => ({
      existing: null,
    }));
};
