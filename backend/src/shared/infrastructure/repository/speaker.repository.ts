import { SpeakerRepositoryPort } from 'src/shared/domain/repository';
import { Db, DbSchema } from '../persistence/db';
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
import { Selectable } from 'kysely';

export class SpeakerRepository extends SpeakerRepositoryPort {
  constructor(private readonly db: Db) {
    super();
  }

  async get({
    tournamentId,
    speakerId,
  }: {
    tournamentId: TournamentId;
    speakerId: SpeakerId;
  }): Promise<Result<Speaker, NotFoundError>> {
    const speaker = await this.db
      .selectFrom('speaker')
      .selectAll()
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
      .selectAll()
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
      .selectAll()
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
    const saved = await this.db
      .insertInto('speaker')
      .values({
        tournamentId,
        id,
        name,
        institutionId,
        teamId,
        anonymous,
        email,
        categories,
      })
      .onConflict((oc) =>
        oc.columns(['tournamentId', 'id']).doUpdateSet({
          name,
          institutionId,
          teamId,
          anonymous,
          email,
          categories,
        }),
      )
      .executeTakeFirst();
    if (saved.numInsertedOrUpdatedRows !== 1n) {
      return err(
        new SaveFailedError(
          `Failed to save speaker id ${id} in tournament ${tournamentId}`,
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

function toModel(row: Selectable<DbSchema['speaker']>): Speaker {
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
