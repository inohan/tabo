import { parseTournamentUrl } from 'src/lib/url';
import {
  Tournament,
  TournamentId,
  Institution,
  InstitutionId,
  Team,
  TeamId,
  Speaker,
  SpeakerId,
  Venue,
  VenueId,
  BreakCategory,
  BreakCategoryId,
  SpeakerCategory,
  SpeakerCategoryId,
} from 'src/shared/domain';
import {
  Tournament as TournamentDTO,
  Institution as InstitutionDTO,
  Team as TeamDTO,
  Speaker as SpeakerDTO,
  Venue as VenueDTO,
  SpeakerCategory as SpeakerCategoryDTO,
  BreakCategory as BreakCategoryDTO,
} from 'tabbycat-client/out/v1.3.0';
import { UrlDeserializer } from './url';
import { TabbycatError } from '../error';

// Translator belongs under v1.3 as this is dependent on API schema and API version

/**
 * Generates a anti-corruption translator that translates Tabbycat DTO schema into domain entities.
 * @param tournamentId Tournament ID that will be inserted. Unique value that tabbycat does not own.
 * @returns Translator
 */
export const initTranslator = (tournamentId: TournamentId) => ({
  tournament: ({ id, name, url, slug, shortName }: TournamentDTO): Tournament =>
    Tournament.init({
      id: tournamentId,
      tabId: id,
      baseUrl: parseTournamentUrl(url),
      name,
      slug,
      shortName: shortName ?? name,
    }),
  institution: ({ id, code, name }: InstitutionDTO): Institution =>
    Institution.init({
      tournamentId,
      id: InstitutionId.init(id),
      code,
      name,
    }),
  team: ({
    id,
    longName,
    shortName,
    breakCategories,
    emoji,
    institution,
    institutionConflicts,
    reference,
    shortReference,
    speakers,
    useInstitutionPrefix,
    codeName,
  }: TeamDTO): Team => {
    if (
      reference === undefined ||
      shortReference === undefined ||
      institutionConflicts === undefined ||
      breakCategories === undefined ||
      speakers === undefined ||
      institution === undefined ||
      emoji === undefined ||
      codeName === undefined ||
      useInstitutionPrefix === undefined
    ) {
      throw new TabbycatError(undefined, 'Missing fields in TeamDTO');
    }
    return Team.init({
      tournamentId,
      id: TeamId.init(id),
      reference,
      shortReference,
      institutionId:
        institution !== null
          ? UrlDeserializer.institutionId(institution)
          : null,
      institutionConflicts: institutionConflicts.map(
        UrlDeserializer.institutionId,
      ),
      breakCategories: breakCategories.map(UrlDeserializer.breakCategoryId),
      emoji,
      longName,
      shortName,
      speakers: speakers.map(({ url }) => UrlDeserializer.speakerId(url)),
      codeName,
      useInstitutionPrefix,
    });
  },
  speaker: ({
    categories,
    id,
    name,
    team,
    anonymous,
    email,
  }: SpeakerDTO): Speaker => {
    if (anonymous === undefined || email === undefined) {
      throw new TabbycatError(undefined, 'Missing field in SpeakerDTO');
    }
    return Speaker.init({
      tournamentId,
      id: SpeakerId.init(id),
      teamId: UrlDeserializer.teamId(team),
      name,
      anonymous,
      email,
      categories: categories.map(UrlDeserializer.speakerCategoryId),
      institutionId: null, //TODO: Think of institution
    });
  },
  venue: ({ id, displayName, name, priority }: VenueDTO): Venue => {
    return Venue.init({
      tournamentId,
      id: VenueId.init(id),
      displayName,
      name,
      priority,
    });
  },
  breakCategory: ({
    id,
    breakSize,
    isGeneral,
    name,
    priority,
    reserveSize,
    seq,
    slug,
  }: BreakCategoryDTO): BreakCategory => {
    if (reserveSize === undefined) {
      throw new TabbycatError(undefined, 'Missing field in BreakCategoryDTO');
    }
    return BreakCategory.init({
      tournamentId,
      id: BreakCategoryId.init(id),
      breakSize,
      isGeneral,
      name,
      priority,
      reserveSize,
      seq,
      slug,
    });
  },
  speakerCategory: ({
    id,
    name,
    seq,
    slug,
  }: SpeakerCategoryDTO): SpeakerCategory => {
    return SpeakerCategory.init({
      tournamentId,
      id: SpeakerCategoryId.init(id),
      name,
      seq,
      slug,
    });
  },
});
