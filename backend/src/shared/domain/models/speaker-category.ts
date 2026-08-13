import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { SpeakerCategoryDTO } from '@shared/clients/tabbycat';
import { throw_ } from 'src/lib/throw';
export declare const speakerCategorySymbol: unique symbol;
export declare const speakerCategoryIdSymbol: unique symbol;

export type SpeakerCategoryId = Branded<number, typeof speakerCategoryIdSymbol>;

export type SpeakerCategory = Branded<
  {
    readonly id: SpeakerCategoryId;
    readonly tournamentId: TournamentId;
    name: string;
    slug: string;
    seq: number;
  },
  typeof speakerCategorySymbol
>;

export const SpeakerCategoryId = {
  ...Struct<SpeakerCategoryId>(),
};

export const SpeakerCategory = {
  ...Struct<SpeakerCategory>(),

  /**
   * Constructs entity from tabbycat DTO
   * @param dto The DTO object.
   * @param tournamentId The tournament id.
   * @param entity The original entity before update.
   * @returns Newly constructed entity with updates.
   */
  fromDto(
    dto: SpeakerCategoryDTO,
    tournamentId: TournamentId,
    entity?: SpeakerCategory,
  ): SpeakerCategory {
    if (entity !== undefined) {
      if (entity.tournamentId !== tournamentId) {
        throw_(new Error(`Tournament ID is immutable and should match.`));
      }
      if (entity.id !== dto.id) {
        throw_(new Error('Id is immutable and should match.'));
      }
      return SpeakerCategory.init({
        ...entity,
        name: dto.name,
        slug: dto.slug,
        seq: dto.seq,
      });
    } else {
      return SpeakerCategory.init({
        id: dto.id,
        tournamentId: tournamentId,
        name: dto.name,
        slug: dto.slug,
        seq: dto.seq,
      });
    }
  },
};
