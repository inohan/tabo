import { TeamImportSessionId } from '@importer/domain/models';
import { TournamentId } from '@shared/domain';
import {
  Db as ImporterDb,
  DbSchema as ImporterDbSchema,
} from '../persistence/db';
import { Selectable } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import * as v from 'valibot';
import { CellValue, ImportOrigin } from '@importer/domain/values';
import { integerSchema } from 'src/lib/integer';
import { match, P } from 'ts-pattern';
import { throwUnexpected_ } from 'src/lib/throw';
import { TeamDto, TeamQuery } from '@shared/infrastructure/query';

export const TeamImportResultDto = v.variant('status', [
  v.object({
    status: v.picklist(['success', 'skipped']),
  }),
  v.object({
    status: v.literal('failed'),
    error: v.string(),
  }),
]);

export type TeamImportResultDto = v.InferOutput<typeof TeamImportResultDto>;

export const TeamMatchDto = v.object({
  id: integerSchema,
  reference: v.string(),
  needsUpdate: v.boolean(),
  speakers: v.array(
    v.object({
      id: integerSchema,
      name: v.string(),
      email: v.nullable(v.string()),
    }),
  ),
});

export type TeamMatchDto = v.InferOutput<typeof TeamMatchDto>;

export const TeamImportRowDto = v.intersect([
  v.object({
    raw: v.array(CellValue),
  }),
  v.variant('parseResult', [
    v.object({
      parseResult: v.literal(true),
      matched: v.nullable(TeamMatchDto),
      warnings: v.array(v.string()),
      doImport: v.boolean(),
    }),
    v.object({
      parseResult: v.literal(false),
      error: v.string(),
    }),
  ]),
]);

export type TeamImportRowDto = v.InferOutput<typeof TeamImportRowDto>;

export const TeamImportSessionDto = v.intersect([
  v.object({
    id: v.string(),
    origin: ImportOrigin,
    headers: v.array(v.nullable(v.string())),
    createdAt: v.pipe(v.string(), v.isoTimestamp()),
    updatedAt: v.pipe(v.string(), v.isoTimestamp()),
    rows: v.array(TeamImportRowDto),
  }),
  v.variant('status', [
    v.object({
      status: v.literal('incomplete'),
    }),
    v.object({
      status: v.literal('missing-entities'),
      error: v.object({
        institutions: v.array(
          v.object({
            code: v.string(),
            reason: v.string(),
          }),
        ),
        breakCategories: v.array(
          v.object({
            slug: v.string(),
            reason: v.string(),
          }),
        ),
        speakerCategories: v.array(
          v.object({
            slug: v.string(),
            reason: v.string(),
          }),
        ),
      }),
    }),
    v.object({
      status: v.picklist(['new-teams', 'success']),
      results: v.array(TeamImportResultDto),
    }),
  ]),
]);

export type TeamImportSessionDto = v.InferOutput<typeof TeamImportSessionDto>;

const toRowDto = (
  row: Selectable<ImporterDbSchema['importTeamRow']>,
  teamsMap: Map<number, TeamDto>,
): TeamImportRowDto =>
  match(row)
    .returnType<TeamImportRowDto>()
    .with(
      { success: true },
      ({ raw, doImport, duplication, matched, success, updateNecessity }) => ({
        parseResult: success,
        raw,
        doImport: doImport ?? throwUnexpected_(),
        matched: match(matched)
          .returnType<TeamMatchDto | null>()
          .with({ existing: P.number }, ({ existing }) => {
            const team = teamsMap.get(existing) ?? throwUnexpected_();
            return {
              id: existing,
              reference: team.reference,
              needsUpdate: match(updateNecessity)
                .with({ team: 'match' }, () => false)
                .with({ team: 'update' }, () => true)
                .otherwise(() => throwUnexpected_()),
              speakers: team.speakers.map((spk) => ({
                id: spk.id,
                name: spk.name,
                email: spk.email,
              })),
            };
          })
          .with({ existing: null }, () => null)
          .otherwise(() => throwUnexpected_()),
        warnings: match(duplication)
          .with({ hasDuplicate: true }, ({ reasons }) => reasons)
          .with({ hasDuplicate: false }, () => [])
          .otherwise(() => throwUnexpected_()),
      }),
    )
    .with({ success: false }, ({ success, raw, error }) => ({
      parseResult: success,
      raw,
      error: error ?? throwUnexpected_(),
    }))
    .exhaustive();

const toDto = (
  result: Selectable<ImporterDbSchema['teamImportSession']> & {
    rows: Selectable<ImporterDbSchema['importTeamRow']>[];
  },
  teamsMap: Map<number, TeamDto>,
): TeamImportSessionDto => {
  const shared = {
    id: result.sessionId,
    origin: result.origin,
    headers: result.headers,
    createdAt: result.createdAt.toISOString(),
    updatedAt: result.updatedAt.toISOString(),
    rows: result.rows.map((row) => toRowDto(row, teamsMap)),
  };
  return match(result)
    .returnType<TeamImportSessionDto>()
    .with({ status: 'incomplete' }, ({ status }) => ({
      ...shared,
      status,
    }))
    .with({ status: 'missing-entities' }, ({ status, errorDetail }) => {
      const error = errorDetail ?? throwUnexpected_();
      return {
        ...shared,
        status,
        error: {
          institutions: error.institutions,
          breakCategories: error.breakCategories,
          speakerCategories: error.speakerCategories,
        },
      };
    })
    .with({ status: P.union('new-teams', 'success') }, ({ status, rows }) => ({
      ...shared,
      status,
      results: rows.map((row) =>
        match(row)
          .returnType<TeamImportResultDto>()
          .with(
            { success: true, doImport: true, importResult: { success: true } },
            () => ({ status: 'success' }),
          )
          .with(
            { success: true, doImport: true, importResult: { success: false } },
            ({ importResult: { reason } }) => ({
              status: 'failed',
              error: reason,
            }),
          )
          .with({ success: true, doImport: true }, () => throwUnexpected_())
          .otherwise(() => ({ status: 'skipped' })),
      ),
    }))
    .exhaustive();
};

export class TeamImportSessionQuery {
  constructor(
    private importerDb: ImporterDb,
    private teamQuery: TeamQuery,
  ) {}

  async get({
    tournamentId,
    teamImportSessionId,
  }: {
    tournamentId: TournamentId;
    teamImportSessionId: TeamImportSessionId;
  }) {
    const sessionResult = await this.importerDb
      .selectFrom('teamImportSession')
      .selectAll()
      .select((eb) => [
        jsonArrayFrom(
          eb
            .selectFrom('importTeamRow')
            .selectAll()
            .whereRef(
              'importTeamRow.sessionId',
              '=',
              'teamImportSession.sessionId',
            )
            .orderBy('seq'),
        ).as('rows'),
      ])
      .where('tournamentId', '=', tournamentId)
      .where('sessionId', '=', teamImportSessionId)
      .executeTakeFirst();

    if (sessionResult === undefined) {
      return undefined;
    }

    const teamResult = await this.teamQuery.getByTournamentId({ tournamentId });
    const teamsMap = new Map(
      teamResult.map((teamDto) => [teamDto.id, teamDto]),
    );
    return toDto(sessionResult, teamsMap);
  }
}
