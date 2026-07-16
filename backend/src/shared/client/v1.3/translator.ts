import {
  InstitutionId,
  TeamId,
  SpeakerId,
  VenueId,
  BreakCategoryId,
  SpeakerCategoryId,
  AdjudicatorId,
} from 'src/shared/domain';
import * as DTO from '../output-dto';
import * as Tc from 'tabbycat-client/out/v1.3.0';
import * as v from 'valibot';
import { UrlDeserializer } from './url';
import { TabbycatError } from '../error';

// Translator belongs under v1.3 as this is dependent on API schema and API version

const TournamentSchema = v.object({
  id: v.number(),
  slug: v.string(),
  name: v.string(),
  shortName: v.string(),
});

const InstitutionSchema = v.object({
  id: v.pipe(v.number(), v.transform(InstitutionId.init)),
  name: v.string(),
  code: v.string(),
});

const TeamSchema = v.pipe(
  v.object({
    id: v.pipe(v.number(), v.transform(TeamId.init)),
    reference: v.string(),
    shortReference: v.string(),
    institution: v.union([
      v.pipe(v.string(), v.transform(UrlDeserializer.institutionId)),
      v.null(),
    ]),
    breakCategories: v.array(
      v.pipe(v.string(), v.transform(UrlDeserializer.breakCategoryId)),
    ),
    institutionConflicts: v.array(
      v.pipe(v.string(), v.transform(UrlDeserializer.institutionId)),
    ),
    speakers: v.array(
      v.object({
        id: v.pipe(v.number(), v.transform(SpeakerId.init)),
        name: v.string(),
        categories: v.array(
          v.pipe(v.string(), v.transform(UrlDeserializer.speakerCategoryId)),
        ),
        anonymous: v.boolean(),
        email: v.union([v.string(), v.null()]),
      }),
    ),
    emoji: v.union([v.string(), v.null()]),
    codeName: v.string(),
    useInstitutionPrefix: v.boolean(),
    shortName: v.string(),
    longName: v.string(),
  }),
  v.transform(
    ({
      id,
      reference,
      shortReference,
      institution,
      breakCategories,
      institutionConflicts,
      speakers,
      emoji,
      codeName,
      useInstitutionPrefix,
      shortName,
      longName,
    }) => ({
      id,
      reference,
      shortReference,
      institutionId: institution,
      institutionConflicts,
      speakers,
      breakCategories,
      emoji,
      codeName,
      useInstitutionPrefix,
      shortName,
      longName,
    }),
  ),
);

const SpeakerSchema = v.pipe(
  v.object({
    id: v.pipe(v.number(), v.transform(SpeakerId.init)),
    name: v.string(),
    team: v.pipe(v.string(), v.transform(UrlDeserializer.teamId)),
    categories: v.array(
      v.pipe(v.string(), v.transform(UrlDeserializer.speakerCategoryId)),
    ),
    anonymous: v.boolean(),
    email: v.union([v.string(), v.null()]),
  }),
  v.transform(({ id, name, team, categories, anonymous, email }) => ({
    id,
    name,
    teamId: team,
    categories,
    anonymous,
    email,
  })),
);

const VenueSchema = v.object({
  id: v.pipe(v.number(), v.transform(VenueId.init)),
  name: v.string(),
  displayName: v.string(),
  priority: v.number(),
});

const BreakCategorySchema = v.object({
  id: v.pipe(v.number(), v.transform(BreakCategoryId.init)),
  name: v.string(),
  slug: v.string(),
  seq: v.number(),
  breakSize: v.number(),
  reserveSize: v.number(),
  isGeneral: v.boolean(),
  priority: v.number(),
});

const SpeakerCategorySchema = v.object({
  id: v.pipe(v.number(), v.transform(SpeakerCategoryId.init)),
  name: v.string(),
  slug: v.string(),
  seq: v.number(),
});

const AdjudicatorSchema = v.pipe(
  v.object({
    id: v.pipe(v.number(), v.transform(AdjudicatorId.init)),
    name: v.string(),
    institution: v.union([
      v.pipe(v.string(), v.transform(UrlDeserializer.institutionId)),
      v.null(),
    ]),
    institutionConflicts: v.array(
      v.pipe(v.string(), v.transform(UrlDeserializer.institutionId)),
    ),
    teamConflicts: v.array(
      v.pipe(v.string(), v.transform(UrlDeserializer.teamId)),
    ),
    adjudicatorConflicts: v.array(
      v.pipe(v.string(), v.transform(UrlDeserializer.adjudicatorId)),
    ),
    breaking: v.boolean(),
    independent: v.boolean(),
    adjCore: v.boolean(),
  }),
  v.transform(
    ({
      id,
      name,
      institution,
      institutionConflicts,
      teamConflicts,
      adjudicatorConflicts,
      breaking,
      independent,
      adjCore,
    }) => ({
      id,
      name,
      institutionId: institution,
      institutionConflicts,
      teamConflicts,
      adjudicatorConflicts,
      breaking,
      independent,
      adjCore,
    }),
  ),
);

const tryParse = <
  T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(
  schema: T,
  object: unknown,
  response?: Response,
): v.InferOutput<T> => {
  try {
    return v.parse(schema, object);
  } catch (error) {
    throw new TabbycatError(
      `Parsing failed: ${(error as Error).message}`,
      response,
    );
  }
};

export const tournament = (
  tournament: Tc.Tournament,
  response?: Response,
): DTO.TournamentDTO => tryParse(TournamentSchema, tournament, response);
export const institution = (
  institution: Tc.Institution,
  response?: Response,
): DTO.InstitutionDTO => tryParse(InstitutionSchema, institution, response);
export const team = (team: Tc.Team, response?: Response): DTO.TeamDTO =>
  tryParse(TeamSchema, team, response);
export const speaker = (
  speaker: Tc.Speaker,
  response?: Response,
): DTO.SpeakerDTO => tryParse(SpeakerSchema, speaker, response);
export const venue = (venue: Tc.Venue, response?: Response): DTO.VenueDTO =>
  tryParse(VenueSchema, venue, response);
export const breakCategory = (
  bc: Tc.BreakCategory,
  response?: Response,
): DTO.BreakCategoryDTO => tryParse(BreakCategorySchema, bc, response);
export const speakerCategory = (
  sc: Tc.SpeakerCategory,
  response?: Response,
): DTO.SpeakerCategoryDTO => tryParse(SpeakerCategorySchema, sc, response);
export const adjudicator = (
  adjudicator: Tc.Adjudicator,
  response?: Response,
): DTO.AdjudicatorDTO => tryParse(AdjudicatorSchema, adjudicator, response);
