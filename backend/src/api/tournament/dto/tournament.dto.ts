import * as v from 'valibot';
import { createDto } from 'src/api/lib/valibot';
import { integerSchema } from 'src/lib/integer';

export const TournamentSchema = v.object({
  tournamentId: v.pipe(v.string(), v.uuid()),
  baseUrl: v.string(),
  id: integerSchema,
  slug: v.string(),
  name: v.string(),
  shortName: v.string(),
});

export const NestTournamentDto = createDto(
  'NestTournamentDto',
  TournamentSchema,
);
export type NestTournamentDto = v.InferOutput<typeof TournamentSchema>;

export const CreateTournamentSchema = v.object({
  baseUrl: v.pipe(v.string(), v.url()),
  token: v.pipe(v.string(), v.minLength(1)),
  tournamentSlug: v.pipe(v.string(), v.minLength(1)),
});

export const NestCreateTournamentDto = createDto(
  'NestCreateTournamentDto',
  CreateTournamentSchema,
);
export type NestCreateTournamentDto = v.InferOutput<
  typeof CreateTournamentSchema
>;

export const QueryTournamentCandidateSchema = v.object({
  url: v.pipe(v.string(), v.url()),
  token: v.pipe(v.string(), v.minLength(1)),
  tournamentSlug: v.optional(v.string()),
});

export const NestQueryTournamentCandidateDto = createDto(
  'NestQueryTournamentCandidateDto',
  QueryTournamentCandidateSchema,
);
export type NestQueryTournamentCandidateDto = v.InferOutput<
  typeof QueryTournamentCandidateSchema
>;

export const TournamentTabbycatSchema = v.object({
  id: integerSchema,
  slug: v.string(),
  name: v.string(),
  shortName: v.string(),
});

export const NestTournamentTabbycatDto = createDto(
  'NestTournamentTabbycatDto',
  TournamentTabbycatSchema,
);
export type NestTournamentTabbycatDto = v.InferOutput<
  typeof TournamentTabbycatSchema
>;

export const QueryTournamentCandidateResponseSchema = v.object({
  baseUrl: v.string(),
  tournaments: v.array(TournamentTabbycatSchema),
});

// `tournaments` comes out as a $ref to NestTournamentTabbycatDto: that schema
// already has a DTO of its own, so nesting needs no extra declaration.
export const NestQueryTournamentCandidateResponseDto = createDto(
  'NestQueryTournamentCandidateResponseDto',
  QueryTournamentCandidateResponseSchema,
);
export type NestQueryTournamentCandidateResponseDto = v.InferOutput<
  typeof QueryTournamentCandidateResponseSchema
>;
