import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { BreakCategoryDTO } from '@shared/clients/tabbycat';
import { throw_ } from 'src/lib/throw';
export declare const breakCategorySymbol: unique symbol;
export declare const breakCategoryIdSymbol: unique symbol;

export type BreakCategoryId = Branded<number, typeof breakCategoryIdSymbol>;

export type BreakCategory = Branded<
  {
    readonly id: BreakCategoryId;
    readonly tournamentId: TournamentId;
    name: string;
    slug: string;
    seq: number;
    breakSize: number;
    reserveSize: number;
    isGeneral: boolean;
    priority: number;
  },
  typeof breakCategorySymbol
>;

export const BreakCategoryId = {
  ...Struct<BreakCategoryId>(),
};

export const BreakCategory = {
  ...Struct<BreakCategory>(),

  /**
   * Constructs entity from tabbycat DTO
   * @param dto The DTO object.
   * @param tournamentId The tournament id.
   * @param entity The original entity before update.
   * @returns Newly constructed entity with updates.
   */
  fromDto(
    dto: BreakCategoryDTO,
    tournamentId: TournamentId,
    entity?: BreakCategory,
  ): BreakCategory {
    if (entity !== undefined) {
      if (entity.tournamentId !== tournamentId) {
        throw_(new Error(`Tournament ID is immutable and should match.`));
      }
      if (entity.id !== dto.id) {
        throw_(new Error('Id is immutable and should match.'));
      }
      return BreakCategory.init({
        ...entity,
        name: dto.name,
        slug: dto.slug,
        seq: dto.seq,
        breakSize: dto.breakSize,
        reserveSize: dto.reserveSize,
        isGeneral: dto.isGeneral,
        priority: dto.priority,
      });
    } else {
      return BreakCategory.init({
        id: dto.id,
        tournamentId: tournamentId,
        name: dto.name,
        slug: dto.slug,
        seq: dto.seq,
        breakSize: dto.breakSize,
        reserveSize: dto.reserveSize,
        isGeneral: dto.isGeneral,
        priority: dto.priority,
      });
    }
  },
};
