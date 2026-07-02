import {
  BreakCategoriesApi,
  Configuration,
  InstitutionsApi,
  SpeakerCategoriesApi,
  TeamsApi,
  TournamentsApi,
  VenuesApi,
} from 'tabbycat-client/out/v1.3.0';
import { ClientFactoryPort, ClientPort } from '../client-port';
import { ResultAsync } from 'neverthrow';
import { isResponseError, TabbycatError } from '../error';
import { Translator } from './translator';
import {
  SpeakerId,
  TeamId,
  InstitutionId,
  VenueId,
  BreakCategoryId,
  SpeakerCategoryId,
} from 'src/shared/domain';
import { UrlSerializer } from './url';

function asResult<T>(promise: Promise<T>): ResultAsync<T, TabbycatError>;
function asResult<T, R>(
  promise: Promise<T>,
  converter: (t: T) => R,
): ResultAsync<R, TabbycatError>;
function asResult<T>(
  promise: Promise<T>,
  converter?: (t: T) => unknown,
): ResultAsync<unknown, TabbycatError> {
  return ResultAsync.fromPromise(
    promise.then(converter ?? ((ob) => ob)).catch(async (e: Error) => {
      if (isResponseError(e)) {
        throw await TabbycatError.fromResponseError(e);
      } else {
        throw new TabbycatError(undefined, `${e.message}`);
      }
    }),
    (e) => e as TabbycatError,
  );
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
  const config = new Configuration({ basePath: baseUrl, apiKey: token });
  const translator = Translator;
  return {
    tournaments: {
      get: () =>
        asResult(
          new TournamentsApi(config).apiV1TournamentsRetrieve({
            tournamentSlug,
          }),
          translator.tournament,
        ),
    },
    institutions: {
      get: (institutionId) =>
        asResult(
          new InstitutionsApi(config).apiV1InstitutionsRetrieve({
            id: InstitutionId.plain(institutionId),
          }),
          translator.institution,
        ),
      list: () =>
        asResult(
          new InstitutionsApi(config).apiV1InstitutionsList(),
          (institutions) => institutions.map(translator.institution),
        ),
      create: ({ code, name }) =>
        asResult(
          new InstitutionsApi(config).apiV1InstitutionsCreate({
            institution: {
              code,
              name,
              region: undefined,
              venueConstraints: undefined,
            },
          }),
          translator.institution,
        ),
      update: ({ id, code, name }) =>
        asResult(
          new InstitutionsApi(config).apiV1InstitutionsCreate2({
            id: id,
            institution: { code, name },
          }),
          translator.institution,
        ),
      delete: (institutionId) =>
        asResult(
          new InstitutionsApi(config).apiV1InstitutionsDestroy({
            id: institutionId,
          }),
        ),
    },
    teams: {
      get: (teamId) =>
        asResult(
          new TeamsApi(config).apiV1TournamentsTeamsRetrieve({
            tournamentSlug,
            id: TeamId.plain(teamId),
          }),
          translator.team,
        ),
      list: () =>
        asResult(
          new TeamsApi(config).apiV1TournamentsTeamsList({ tournamentSlug }),
          (teams) => teams.map(translator.team),
        ),
      create: ({
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
          new TeamsApi(config).apiV1TournamentsTeamsCreate({
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
          translator.team,
        ),
      update: ({
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
          new TeamsApi(config).apiV1TournamentsTeamsCreate2({
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
          translator.team,
        ),
      delete: (teamId) =>
        asResult(
          new TeamsApi(config).apiV1TournamentsTeamsDestroy({
            tournamentSlug,
            id: TeamId.plain(teamId),
          }),
        ),
    },
    speakers: {
      get: (speakerId) =>
        asResult(
          new TeamsApi(config).apiV1TournamentsSpeakersRetrieve({
            tournamentSlug,
            id: SpeakerId.plain(speakerId),
          }),
          translator.speaker,
        ),
      list: () =>
        asResult(
          new TeamsApi(config).apiV1TournamentsSpeakersList({
            tournamentSlug,
          }),
          (speakers) => speakers.map(translator.speaker),
        ),
      create: ({ categories, name, teamId, anonymous, email }) =>
        asResult(
          new TeamsApi(config).apiV1TournamentsSpeakersCreate({
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
          translator.speaker,
        ),
      update: ({ id, anonymous, categories, email, name, teamId }) =>
        asResult(
          new TeamsApi(config).apiV1TournamentsSpeakersCreate2({
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
          translator.speaker,
        ),
      delete: (speakerId) =>
        asResult(
          new TeamsApi(config).apiV1TournamentsSpeakersDestroy({
            tournamentSlug,
            id: SpeakerId.plain(speakerId),
          }),
        ),
    },
    venues: {
      get: (venueId) =>
        asResult(
          new VenuesApi(config).apiV1TournamentsVenuesRetrieve({
            tournamentSlug,
            id: VenueId.plain(venueId),
          }),
          translator.venue,
        ),
      list: () =>
        asResult(
          new VenuesApi(config).apiV1TournamentsVenuesList({ tournamentSlug }),
          (venues) => venues.map(translator.venue),
        ),
    },
    breakCategories: {
      get: (breakCategoryId) =>
        asResult(
          new BreakCategoriesApi(
            config,
          ).apiV1TournamentsBreakCategoriesRetrieve({
            tournamentSlug,
            id: BreakCategoryId.plain(breakCategoryId),
          }),
          translator.breakCategory,
        ),
      list: () =>
        asResult(
          new BreakCategoriesApi(config).apiV1TournamentsBreakCategoriesList({
            tournamentSlug,
          }),
          (breakCategories) => breakCategories.map(translator.breakCategory),
        ),
      create: ({
        name,
        slug,
        seq,
        breakSize,
        isGeneral,
        priority,
        reserveSize,
      }) =>
        asResult(
          new BreakCategoriesApi(config).apiV1TournamentsBreakCategoriesCreate({
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
          }),
          translator.breakCategory,
        ),
      update: ({
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
          new BreakCategoriesApi(config).apiV1TournamentsBreakCategoriesCreate2(
            {
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
            },
          ),
          translator.breakCategory,
        ),
      delete: (breakCategoryId) =>
        asResult(
          new BreakCategoriesApi(config).apiV1TournamentsBreakCategoriesDestroy(
            {
              tournamentSlug,
              id: BreakCategoryId.plain(breakCategoryId),
            },
          ),
        ),
    },
    speakerCategories: {
      get: (speakerCategoryId) =>
        asResult(
          new SpeakerCategoriesApi(
            config,
          ).apiV1TournamentsSpeakerCategoriesRetrieve({
            tournamentSlug,
            id: SpeakerCategoryId.plain(speakerCategoryId),
          }),
          translator.speakerCategory,
        ),
      list: () =>
        asResult(
          new SpeakerCategoriesApi(
            config,
          ).apiV1TournamentsSpeakerCategoriesList({ tournamentSlug }),
          (speakerCategories) =>
            speakerCategories.map(translator.speakerCategory),
        ),
      create: ({ name, slug, seq }) =>
        asResult(
          new SpeakerCategoriesApi(
            config,
          ).apiV1TournamentsSpeakerCategoriesCreate({
            tournamentSlug,
            // @ts-expect-error _links is not being omitted properly due to casing
            speakerCategory: { name, slug, seq },
          }),
          translator.speakerCategory,
        ),
      update: ({ id, name, slug, seq }) =>
        asResult(
          new SpeakerCategoriesApi(
            config,
          ).apiV1TournamentsSpeakerCategoriesCreate2({
            tournamentSlug,
            id: SpeakerCategoryId.plain(id),
            // @ts-expect-error _links is not being omitted properly due to casing
            speakerCategory: { name, slug, seq },
          }),
          translator.speakerCategory,
        ),
      delete: (speakerCategoryId) =>
        asResult(
          new SpeakerCategoriesApi(
            config,
          ).apiV1TournamentsSpeakerCategoriesDestroy({
            tournamentSlug,
            id: SpeakerCategoryId.plain(speakerCategoryId),
          }),
        ),
    },
  } satisfies ClientPort;
};
