import {
  AdjudicatorsApi,
  BreakCategoriesApi,
  Configuration,
  InstitutionsApi,
  SpeakerCategoriesApi,
  TeamsApi,
  TournamentsApi,
  UsersApi,
  VenuesApi,
} from 'tabbycat-client/out/v1.3.0';
import { ClientFactoryPort, ClientPort } from '../client-port';
import { err, Result, ok } from 'neverthrow';
import {
  isResponseError,
  TabbycatError,
  TabbycatResponseError,
} from '../error';
import * as Translator from './translator';
import {
  SpeakerId,
  TeamId,
  InstitutionId,
  VenueId,
  BreakCategoryId,
  SpeakerCategoryId,
  AdjudicatorId,
} from 'src/shared/domain';
import { UrlSerializer } from './url';

type ApiResponseRaw<T> = {
  raw: Response;
  value(): Promise<T>;
};

function asResult<T>(
  promise: Promise<ApiResponseRaw<T>>,
): Promise<Result<T, TabbycatError>>;
function asResult<T, R>(
  promise: Promise<ApiResponseRaw<T>>,
  converter: (t: T, response?: Response) => R,
): Promise<Result<R, TabbycatError>>;
async function asResult<T, R>(
  promise: Promise<ApiResponseRaw<T>>,
  converter?: (t: T, response?: Response) => R,
): Promise<Result<unknown, TabbycatError>> {
  try {
    const result = await promise;
    if (converter === undefined) {
      return ok(await result.value());
    } else {
      try {
        const convertedResult = converter(await result.value(), result.raw);
        return ok(convertedResult);
      } catch (e) {
        if (e instanceof TabbycatError) {
          return err(e);
        }
        throw e;
      }
    }
  } catch (e) {
    if (isResponseError(e)) {
      return err(await TabbycatResponseError.fromResponseError(e));
    }
    throw e;
  }
}

export const generateClientV1_3: ClientFactoryPort = ({
  baseUrl,
  token,
  tournamentSlug,
}: {
  baseUrl: string;
  token: string;
  tournamentSlug: string;
}): ClientPort => {
  const config = new Configuration({
    basePath: baseUrl,
    apiKey: `Token ${token}`,
  });
  return {
    getTournament: () =>
      asResult(
        new TournamentsApi(config).apiV1TournamentsRetrieveRaw({
          tournamentSlug,
        }),
        Translator.tournament,
      ),
    listTournaments: () =>
      asResult(
        new TournamentsApi(config).apiV1TournamentsListRaw({}),
        (tournaments, response) =>
          tournaments.map((t) => Translator.tournament(t, response)),
      ),

    getInstitution: (institutionId) =>
      asResult(
        new InstitutionsApi(config).apiV1InstitutionsRetrieveRaw({
          id: InstitutionId.plain(institutionId),
        }),
        Translator.institution,
      ),
    listInstitutions: () =>
      asResult(
        new InstitutionsApi(config).apiV1InstitutionsListRaw({}),
        (institutions, response) =>
          institutions.map((i) => Translator.institution(i, response)),
      ),
    createInstitution: ({ code, name }) =>
      asResult(
        new InstitutionsApi(config).apiV1InstitutionsCreateRaw({
          institution: {
            code,
            name,
            region: undefined,
            venueConstraints: undefined,
          },
        }),
        Translator.institution,
      ),
    updateInstitution: ({ id, code, name }) =>
      asResult(
        new InstitutionsApi(config).apiV1InstitutionsCreate2Raw({
          id: id,
          institution: { code, name },
        }),
        Translator.institution,
      ),
    deleteInstitution: (institutionId) =>
      asResult(
        new InstitutionsApi(config).apiV1InstitutionsDestroyRaw({
          id: institutionId,
        }),
      ),

    getTeam: (teamId) =>
      asResult(
        new TeamsApi(config).apiV1TournamentsTeamsRetrieveRaw({
          tournamentSlug,
          id: TeamId.plain(teamId),
        }),
        Translator.team,
      ),
    listTeams: () =>
      asResult(
        new TeamsApi(config).apiV1TournamentsTeamsListRaw({ tournamentSlug }),
        (teams, response) => teams.map((t) => Translator.team(t, response)),
      ),
    createTeam: ({
      breakCategories,
      codeName,
      emoji,
      institutionConflicts,
      institutionId,
      reference,
      shortReference,
      speakers,
      useInstitutionPrefix,
    }) =>
      asResult(
        new TeamsApi(config).apiV1TournamentsTeamsCreateRaw({
          tournamentSlug,
          team: {
            institution:
              institutionId !== null
                ? UrlSerializer.institution({ id: institutionId })
                : null,
            breakCategories: breakCategories.map((id) =>
              UrlSerializer.breakCategory({ tournamentSlug, id }),
            ),
            institutionConflicts:
              institutionConflicts !== undefined
                ? institutionConflicts.map((id) =>
                    UrlSerializer.institution({ id }),
                  )
                : undefined,
            codeName,
            // @ts-expect-error TeamEmojiEnum is a closed string literal union; generic string is fine at runtime
            emoji,
            reference,
            shortReference,
            useInstitutionPrefix,
            // @ts-expect-error openapi-generator doesn't generate write types for nested objects; id/url/links are readOnly and excluded at runtime
            speakers: speakers.map(
              ({ name, categories, email, anonymous }) => ({
                name,
                categories: categories.map((id) =>
                  UrlSerializer.speakerCategory({ tournamentSlug, id }),
                ),
                email,
                anonymous,
              }),
            ),
          },
        }),
        Translator.team,
      ),
    updateTeam: ({
      breakCategories,
      codeName,
      emoji,
      id,
      institutionConflicts,
      institutionId,
      reference,
      shortReference,
      useInstitutionPrefix,
    }) =>
      asResult(
        new TeamsApi(config).apiV1TournamentsTeamsCreate2Raw({
          tournamentSlug,
          id: TeamId.plain(id),
          team: {
            breakCategories: breakCategories.map((id) =>
              UrlSerializer.breakCategory({ tournamentSlug, id }),
            ),
            codeName,
            // @ts-expect-error Emoji is supposed to be a literal
            emoji,
            institutionConflicts: institutionConflicts.map((id) =>
              UrlSerializer.institution({ id }),
            ),
            institution:
              institutionId !== null
                ? UrlSerializer.institution({ id: institutionId })
                : null,
            reference,
            shortReference,
            useInstitutionPrefix,
          },
        }),
        Translator.team,
      ),
    deleteTeam: (teamId) =>
      asResult(
        new TeamsApi(config).apiV1TournamentsTeamsDestroyRaw({
          tournamentSlug,
          id: TeamId.plain(teamId),
        }),
      ),

    getSpeaker: (speakerId) =>
      asResult(
        new TeamsApi(config).apiV1TournamentsSpeakersRetrieveRaw({
          tournamentSlug,
          id: SpeakerId.plain(speakerId),
        }),
        Translator.speaker,
      ),
    listSpeakers: () =>
      asResult(
        new TeamsApi(config).apiV1TournamentsSpeakersListRaw({
          tournamentSlug,
        }),
        (speakers, response) =>
          speakers.map((s) => Translator.speaker(s, response)),
      ),
    createSpeaker: ({ categories, name, teamId, anonymous, email }) =>
      asResult(
        new TeamsApi(config).apiV1TournamentsSpeakersCreateRaw({
          tournamentSlug,
          // @ts-expect-error _links is not being omitted properly
          speaker: {
            categories: categories.map((id) =>
              UrlSerializer.speakerCategory({ tournamentSlug, id }),
            ),
            name,
            team: UrlSerializer.team({ tournamentSlug, id: teamId }),
            anonymous,
            email,
          },
        }),
        Translator.speaker,
      ),
    updateSpeaker: ({ id, anonymous, categories, email, name, teamId }) =>
      asResult(
        new TeamsApi(config).apiV1TournamentsSpeakersCreate2Raw({
          tournamentSlug,
          id: SpeakerId.plain(id),
          // @ts-expect-error _links is not being omitted properly
          speaker: {
            anonymous,
            categories: categories.map((id) =>
              UrlSerializer.speakerCategory({ tournamentSlug, id }),
            ),
            email,
            name,
            team: UrlSerializer.team({ tournamentSlug, id: teamId }),
          },
        }),
        Translator.speaker,
      ),
    deleteSpeaker: (speakerId) =>
      asResult(
        new TeamsApi(config).apiV1TournamentsSpeakersDestroyRaw({
          tournamentSlug,
          id: SpeakerId.plain(speakerId),
        }),
      ),

    getVenue: (venueId) =>
      asResult(
        new VenuesApi(config).apiV1TournamentsVenuesRetrieveRaw({
          tournamentSlug,
          id: VenueId.plain(venueId),
        }),
        Translator.venue,
      ),
    listVenues: () =>
      asResult(
        new VenuesApi(config).apiV1TournamentsVenuesListRaw({ tournamentSlug }),
        (venues, response) => venues.map((v) => Translator.venue(v, response)),
      ),

    getBreakCategory: (breakCategoryId) =>
      asResult(
        new BreakCategoriesApi(
          config,
        ).apiV1TournamentsBreakCategoriesRetrieveRaw({
          tournamentSlug,
          id: BreakCategoryId.plain(breakCategoryId),
        }),
        Translator.breakCategory,
      ),
    listBreakCategories: () =>
      asResult(
        new BreakCategoriesApi(config).apiV1TournamentsBreakCategoriesListRaw({
          tournamentSlug,
        }),
        (breakCategories, response) =>
          breakCategories.map((bc) => Translator.breakCategory(bc, response)),
      ),
    createBreakCategory: ({
      name,
      slug,
      seq,
      breakSize,
      isGeneral,
      priority,
      reserveSize,
    }) =>
      asResult(
        new BreakCategoriesApi(config).apiV1TournamentsBreakCategoriesCreateRaw(
          {
            tournamentSlug,
            // @ts-expect-error _links is not being omitted properly due to casing
            breakCategory: {
              name,
              slug,
              seq,
              breakSize,
              isGeneral,
              priority,
              reserveSize,
            },
          },
        ),
        Translator.breakCategory,
      ),
    updateBreakCategory: ({
      id,
      name,
      slug,
      seq,
      breakSize,
      isGeneral,
      priority,
      reserveSize,
    }) =>
      asResult(
        new BreakCategoriesApi(
          config,
        ).apiV1TournamentsBreakCategoriesCreate2Raw({
          tournamentSlug,
          id: BreakCategoryId.plain(id),
          // @ts-expect-error _links is not being omitted properly due to casing
          breakCategory: {
            name,
            slug,
            seq,
            breakSize,
            isGeneral,
            priority,
            reserveSize,
          },
        }),
        Translator.breakCategory,
      ),
    deleteBreakCategory: (breakCategoryId) =>
      asResult(
        new BreakCategoriesApi(
          config,
        ).apiV1TournamentsBreakCategoriesDestroyRaw({
          tournamentSlug,
          id: BreakCategoryId.plain(breakCategoryId),
        }),
      ),

    getSpeakerCategory: (speakerCategoryId) =>
      asResult(
        new SpeakerCategoriesApi(
          config,
        ).apiV1TournamentsSpeakerCategoriesRetrieveRaw({
          tournamentSlug,
          id: SpeakerCategoryId.plain(speakerCategoryId),
        }),
        Translator.speakerCategory,
      ),
    listSpeakerCategories: () =>
      asResult(
        new SpeakerCategoriesApi(
          config,
        ).apiV1TournamentsSpeakerCategoriesListRaw({
          tournamentSlug,
        }),
        (speakerCategories, response) =>
          speakerCategories.map((sc) =>
            Translator.speakerCategory(sc, response),
          ),
      ),
    createSpeakerCategory: ({ name, slug, seq }) =>
      asResult(
        new SpeakerCategoriesApi(
          config,
        ).apiV1TournamentsSpeakerCategoriesCreateRaw({
          tournamentSlug,
          // @ts-expect-error _links is not being omitted properly due to casing
          speakerCategory: { name, slug, seq },
        }),
        Translator.speakerCategory,
      ),
    updateSpeakerCategory: ({ id, name, slug, seq }) =>
      asResult(
        new SpeakerCategoriesApi(
          config,
        ).apiV1TournamentsSpeakerCategoriesCreate2Raw({
          tournamentSlug,
          id: SpeakerCategoryId.plain(id),
          // @ts-expect-error _links is not being omitted properly due to casing
          speakerCategory: { name, slug, seq },
        }),
        Translator.speakerCategory,
      ),
    deleteSpeakerCategory: (speakerCategoryId) =>
      asResult(
        new SpeakerCategoriesApi(
          config,
        ).apiV1TournamentsSpeakerCategoriesDestroyRaw({
          tournamentSlug,
          id: SpeakerCategoryId.plain(speakerCategoryId),
        }),
      ),

    getAdjudicator: (adjudicatorId) =>
      asResult(
        new AdjudicatorsApi(config).apiV1TournamentsAdjudicatorsRetrieveRaw({
          tournamentSlug,
          id: AdjudicatorId.plain(adjudicatorId),
        }),
        Translator.adjudicator,
      ),
    listAdjudicator: () =>
      asResult(
        new AdjudicatorsApi(config).apiV1TournamentsAdjudicatorsListRaw({
          tournamentSlug,
        }),
        (adjudicators, response) =>
          adjudicators.map((adj) => Translator.adjudicator(adj, response)),
      ),
    createAdjudicator: ({
      name,
      institutionId,
      breaking,
      independent,
      adjCore,
      institutionConflicts,
      teamConflicts,
      adjudicatorConflicts,
    }) =>
      asResult(
        new AdjudicatorsApi(config).apiV1TournamentsAdjudicatorsCreateRaw({
          tournamentSlug,
          // @ts-expect-error _links is not being omitted properly due to casing
          adjudicator: {
            name,
            institution:
              institutionId !== null
                ? UrlSerializer.institution({ id: institutionId })
                : null,
            institutionConflicts: (institutionConflicts ?? []).map((id) =>
              UrlSerializer.institution({ id }),
            ),
            teamConflicts: (teamConflicts ?? []).map((id) =>
              UrlSerializer.team({ tournamentSlug, id }),
            ),
            adjudicatorConflicts: (adjudicatorConflicts ?? []).map((id) =>
              UrlSerializer.adjudicator({ tournamentSlug, id }),
            ),
            breaking,
            independent,
            adjCore,
          },
        }),
        Translator.adjudicator,
      ),
    updateAdjudicator: ({
      id,
      name,
      institutionId,
      breaking,
      independent,
      adjCore,
      institutionConflicts,
      teamConflicts,
      adjudicatorConflicts,
    }) =>
      asResult(
        new AdjudicatorsApi(config).apiV1TournamentsAdjudicatorsCreate2Raw({
          tournamentSlug,
          id: AdjudicatorId.plain(id),
          // @ts-expect-error _links is not being omitted properly due to casing
          adjudicator: {
            name,
            institution:
              institutionId !== null
                ? UrlSerializer.institution({ id: institutionId })
                : null,
            institutionConflicts: institutionConflicts.map((id) =>
              UrlSerializer.institution({ id }),
            ),
            teamConflicts: teamConflicts.map((id) =>
              UrlSerializer.team({ tournamentSlug, id }),
            ),
            adjudicatorConflicts: adjudicatorConflicts.map((id) =>
              UrlSerializer.adjudicator({ tournamentSlug, id }),
            ),
            breaking,
            independent,
            adjCore,
          },
        }),
        Translator.adjudicator,
      ),
    deleteAdjudicator: (adjudicatorId) =>
      asResult(
        new AdjudicatorsApi(config).apiV1TournamentsAdjudicatorsDestroyRaw({
          tournamentSlug,
          id: AdjudicatorId.plain(adjudicatorId),
        }),
      ),

    me: () =>
      asResult(
        new UsersApi(config).apiV1UsersMeRetrieveRaw({ id: 0 }),
        () => {},
      ),
  } satisfies ClientPort;
};
