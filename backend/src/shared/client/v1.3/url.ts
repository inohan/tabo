import {
  AdjudicatorId,
  BreakCategoryId,
  InstitutionId,
  SpeakerCategoryId,
  SpeakerId,
  TeamId,
  VenueId,
} from 'src/shared/domain';
import { compileUrl, matchOrRaise } from '../url-parse';

const InstitutionEndpoint = '/api/v1/institutions/:id';
const TeamEndpoint = '/api/v1/tournaments/:tournamentSlug/teams/:id';
const SpeakerEndpoint = '/api/v1/tournaments/:tournamentSlug/speakers/:id';
const AdjudicatorEndpoint =
  '/api/v1/tournaments/:tournamentSlug/adjudicators/:id';
const VenueEndpoint = '/api/v1/tournaments/:tournamentSlug/venues/:id';
const BreakCategoryEndpoint =
  '/api/v1/tournaments/:tournamentSlug/break-categories/:id';
const SpeakerCategoryEndpoint =
  '/api/v1/tournaments/:tournamentSlug/speaker-categories/:id';

/**
 * Deserializes URL strings into Id value objects
 */
export const UrlDeserializer = {
  institutionId: (url: string): InstitutionId =>
    InstitutionId.init(Number(matchOrRaise(url, InstitutionEndpoint).id)),
  teamId: (url: string): TeamId =>
    TeamId.init(Number(matchOrRaise(url, TeamEndpoint).id)),
  speakerId: (url: string): SpeakerId =>
    SpeakerId.init(Number(matchOrRaise(url, SpeakerEndpoint).id)),
  adjudicatorId: (url: string): AdjudicatorId =>
    AdjudicatorId.init(Number(matchOrRaise(url, AdjudicatorEndpoint).id)),
  venueId: (url: string): VenueId =>
    VenueId.init(Number(matchOrRaise(url, VenueEndpoint).id)),
  breakCategoryId: (url: string): BreakCategoryId =>
    BreakCategoryId.init(Number(matchOrRaise(url, BreakCategoryEndpoint).id)),
  speakerCategoryId: (url: string): SpeakerCategoryId =>
    SpeakerCategoryId.init(Number(matchOrRaise(url, SpeakerCategoryEndpoint))),
};

/**
 * Serializes tournament slug and Id value into URL (path only)
 */
export const UrlSerializer = {
  institution: ({ id }: { id: InstitutionId }) =>
    compileUrl(InstitutionEndpoint, { id: InstitutionId.plain(id) }),
  team: ({ tournamentSlug, id }: { tournamentSlug: string; id: TeamId }) =>
    compileUrl(TeamEndpoint, { tournamentSlug, id: TeamId.plain(id) }),
  speaker: ({
    tournamentSlug,
    id,
  }: {
    tournamentSlug: string;
    id: SpeakerId;
  }) =>
    compileUrl(SpeakerEndpoint, { tournamentSlug, id: SpeakerId.plain(id) }),
  adjudicator: ({
    tournamentSlug,
    id,
  }: {
    tournamentSlug: string;
    id: AdjudicatorId;
  }) =>
    compileUrl(AdjudicatorEndpoint, {
      tournamentSlug,
      id: AdjudicatorId.plain(id),
    }),
  venue: ({ tournamentSlug, id }: { tournamentSlug: string; id: VenueId }) =>
    compileUrl(VenueEndpoint, {
      tournamentSlug,
      id: VenueId.plain(id),
    }),
  breakCategory: ({
    tournamentSlug,
    id,
  }: {
    tournamentSlug: string;
    id: BreakCategoryId;
  }) =>
    compileUrl(BreakCategoryEndpoint, {
      tournamentSlug,
      id: BreakCategoryId.plain(id),
    }),
  speakerCategory: ({
    tournamentSlug,
    id,
  }: {
    tournamentSlug: string;
    id: SpeakerCategoryId;
  }) =>
    compileUrl(SpeakerCategoryEndpoint, {
      tournamentSlug,
      id: SpeakerCategoryId.plain(id),
    }),
};
