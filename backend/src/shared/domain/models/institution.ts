import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { InstitutionDTO } from '@shared/clients/tabbycat';
import { throw_ } from 'src/lib/throw';
export declare const institutionSymbol: unique symbol;
export declare const institutionIdSymbol: unique symbol;

export type InstitutionId = Branded<number, typeof institutionIdSymbol>;

export type Institution = Branded<
  {
    readonly id: InstitutionId;
    readonly tournamentId: TournamentId;
    name: string;
    code: string;
  },
  typeof institutionSymbol
>;

export const InstitutionId = {
  ...Struct<InstitutionId>(),
};

export const Institution = {
  ...Struct<Institution>(),

  /**
   * Constructs entity from tabbycat DTO
   * @param dto The DTO object.
   * @param tournamentId The tournament id.
   * @param entity The original entity before update.
   * @returns Newly constructed entity with updates.
   */
  fromDto(
    dto: InstitutionDTO,
    tournamentId: TournamentId,
    entity?: Institution,
  ): Institution {
    if (entity !== undefined) {
      if (entity.tournamentId !== tournamentId) {
        throw_(new Error(`Tournament ID is immutable and should match.`));
      }
      if (entity.id !== dto.id) {
        throw_(new Error('Id is immutable and should match.'));
      }
      return Institution.init({
        ...entity,
        name: dto.name,
        code: dto.code,
      });
    } else {
      return Institution.init({
        id: dto.id,
        tournamentId: tournamentId,
        name: dto.name,
        code: dto.code,
      });
    }
  },
};
