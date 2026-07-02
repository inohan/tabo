import { SpeakerRepositoryPort } from 'src/shared/domain/repository';
import { Db } from '../persistence/db';
import { err, ok, Result } from 'neverthrow';
import {
  Speaker,
  SpeakerId,
  TournamentId,
  InstitutionId,
  TeamId,
  SpeakerCategoryId,
  NotFoundError,
  SaveFailedError,
} from 'src/shared/domain';
import { sql } from 'kysely';

export class SpeakerRepository implements SpeakerRepositoryPort {
  constructor(private readonly db: Db) {}

  async get({
    tournamentId,
    speakerId,
  }: {
    tournamentId: TournamentId;
    speakerId: SpeakerId;
  }): Promise<Result<Speaker, NotFoundError>> {
    const speaker = await this.db
      .selectFrom('speaker')
      .select((eb) => [
        'tournamentId',
        'id',
        'name',
        'institutionId',
        'teamId',
        'anonymous',
        'email',
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('speakerSpeakerCategory').select('speakerCategoryId').whereRef('speakerSpeakerCategory.tournamentId', '=', 'speaker.tournamentId').whereRef('speakerSpeakerCategory.speakerId', '=', 'speaker.id')})`.as(
          'categories',
        ),
      ])
      .where('tournamentId', '=', tournamentId)
      .where('id', '=', speakerId)
      .executeTakeFirst();
    if (speaker === undefined) {
      return err(
        new NotFoundError(
          `Speaker ${speakerId} not found in tournament ${tournamentId}`,
        ),
      );
    }
    return ok(toModel(speaker));
  }

  async getByTournament(
    tournamentId: TournamentId,
  ): Promise<Result<Speaker[], never>> {
    const speakers = await this.db
      .selectFrom('speaker')
      .select((eb) => [
        'tournamentId',
        'id',
        'name',
        'institutionId',
        'teamId',
        'anonymous',
        'email',
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('speakerSpeakerCategory').select('speakerCategoryId').whereRef('speakerSpeakerCategory.tournamentId', '=', 'speaker.tournamentId').whereRef('speakerSpeakerCategory.speakerId', '=', 'speaker.id')})`.as(
          'categories',
        ),
      ])
      .where('tournamentId', '=', tournamentId)
      .execute();

    return ok(speakers.map((speaker) => toModel(speaker)));
  }

  async getByTeam({
    tournamentId,
    teamId,
  }: {
    tournamentId: TournamentId;
    teamId: TeamId;
  }): Promise<Result<Speaker[], never>> {
    const speakers = await this.db
      .selectFrom('speaker')
      .select((eb) => [
        'tournamentId',
        'id',
        'name',
        'institutionId',
        'teamId',
        'anonymous',
        'email',
        sql<
          number[]
        >`ARRAY(${eb.selectFrom('speakerSpeakerCategory').select('speakerCategoryId').whereRef('speakerSpeakerCategory.tournamentId', '=', 'speaker.tournamentId').whereRef('speakerSpeakerCategory.speakerId', '=', 'speaker.id')})`.as(
          'categories',
        ),
      ])
      .where('tournamentId', '=', tournamentId)
      .where('teamId', '=', teamId)
      .execute();

    return ok(speakers.map((speaker) => toModel(speaker)));
  }

  async save(speaker: Speaker): Promise<Result<void, SaveFailedError>> {
    const {
      tournamentId,
      id,
      name,
      institutionId,
      teamId,
      anonymous,
      email,
      categories,
    } = speaker;
    try {
      await this.db.transaction().execute(async (trx) => {
        const saved = await trx
          .insertInto('speaker')
          .values({
            tournamentId,
            id,
            name,
            institutionId,
            teamId,
            anonymous,
            email,
          })
          .onConflict((oc) =>
            oc.columns(['tournamentId', 'id']).doUpdateSet({
              name,
              institutionId,
              teamId,
              anonymous,
              email,
            }),
          )
          .returningAll()
          .executeTakeFirst();
        if (!saved) {
          throw new SaveFailedError(
            `Failed to save speaker ${id} in tournament ${tournamentId}`,
          );
        }
        await trx
          .deleteFrom('speakerSpeakerCategory')
          .where('tournamentId', '=', tournamentId)
          .where('speakerId', '=', id)
          .where('speakerCategoryId', 'not in', categories)
          .execute();
        if (categories.length > 0) {
          await trx
            .insertInto('speakerSpeakerCategory')
            .values(
              categories.map((speakerCategoryId) => ({
                tournamentId,
                speakerId: id,
                speakerCategoryId,
              })),
            )
            .onConflict((oc) =>
              oc
                .columns(['tournamentId', 'speakerId', 'speakerCategoryId'])
                .doNothing(),
            )
            .execute();
        }
      });
    } catch (error) {
      return err(
        new SaveFailedError(
          `Failed to save speaker ${id} in tournament ${tournamentId}: ${error as Error}`,
        ),
      );
    }
    return ok();
  }

  async delete(speaker: Speaker): Promise<Result<void, NotFoundError>> {
    const result = await this.db
      .deleteFrom('speaker')
      .where('tournamentId', '=', speaker.tournamentId)
      .where('id', '=', speaker.id)
      .executeTakeFirst();
    if (result.numDeletedRows === 0n) {
      return err(
        new NotFoundError(
          `Speaker ${speaker.id} not found in tournament ${speaker.tournamentId}`,
        ),
      );
    }
    return ok();
  }
}

function toModel(row: {
  tournamentId: string;
  id: number;
  name: string;
  institutionId: number | null;
  teamId: number;
  anonymous: boolean;
  email: string | null;
  categories: number[];
}): Speaker {
  return Speaker.init({
    id: SpeakerId.init(row.id),
    tournamentId: TournamentId.init(row.tournamentId),
    name: row.name,
    institutionId: row.institutionId
      ? InstitutionId.init(row.institutionId)
      : null,
    teamId: TeamId.init(row.teamId),
    categories: row.categories.map(SpeakerCategoryId.init),
    anonymous: row.anonymous,
    email: row.email,
  });
}
