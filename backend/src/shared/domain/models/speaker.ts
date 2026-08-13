import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { TeamId } from './team';
import { InstitutionId } from './institution';
import { SpeakerCategoryId } from './speaker-category';
import { SpeakerDTO } from '@shared/clients/tabbycat';
import { throw_ } from 'src/lib/throw';
export declare const speakerSymbol: unique symbol;
export declare const speakerIdSymbol: unique symbol;

export type SpeakerId = Branded<number, typeof speakerIdSymbol>;

export type Speaker = Branded<
  {
    readonly id: SpeakerId;
    readonly tournamentId: TournamentId;
    name: string;
    institutionId: InstitutionId | null;
    teamId: TeamId;
    categories: SpeakerCategoryId[];
    anonymous: boolean;
    email: string | null;
  },
  typeof speakerSymbol
>;

export const SpeakerId = {
  ...Struct<SpeakerId>(),
};

export const Speaker = {
  ...Struct<Speaker>(),

  /**
   * Constructs entity from tabbycat DTO.
   *
   * Tabbycat does not track a speaker's institution, so `institutionId` is
   * supplied by the caller (usually inherited from the speaker's team). It is
   * only applied on creation; an existing entity keeps its own value.
   * @param dto The DTO object, with the caller-supplied `institutionId`.
   * @param tournamentId The tournament id.
   * @param entity The original entity before update.
   * @returns Newly constructed entity with updates.
   */
  fromDto(
    dto: SpeakerDTO,
    tournamentId: TournamentId,
    entity?: Speaker,
  ): Speaker {
    if (entity !== undefined) {
      if (entity.tournamentId !== tournamentId) {
        throw_(new Error(`Tournament ID is immutable and should match.`));
      }
      if (entity.id !== dto.id) {
        throw_(new Error('Id is immutable and should match.'));
      }
      return Speaker.init({
        ...entity,
        name: dto.name,
        teamId: dto.teamId,
        categories: dto.categories,
        anonymous: dto.anonymous,
        email: dto.email,
      });
    } else {
      return Speaker.init({
        id: dto.id,
        tournamentId: tournamentId,
        name: dto.name,
        institutionId: null,
        teamId: dto.teamId,
        categories: dto.categories,
        anonymous: dto.anonymous,
        email: dto.email,
      });
    }
  },

  replaceInstitution(speaker: Speaker, institutionId: InstitutionId | null) {
    return Speaker.init({
      ...speaker,
      institutionId: institutionId,
    });
  },
};
