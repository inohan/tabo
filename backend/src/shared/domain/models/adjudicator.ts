import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { InstitutionId } from './institution';
import { TeamId } from './team';
import { AdjudicatorDTO } from '@shared/clients/tabbycat';
import { throw_ } from 'src/lib/throw';
export declare const adjudicatorSymbol: unique symbol;
export declare const adjudicatorIdSymbol: unique symbol;

export type AdjudicatorId = Branded<number, typeof adjudicatorIdSymbol>;

export type Adjudicator = Branded<
  {
    readonly id: AdjudicatorId;
    readonly tournamentId: TournamentId;
    name: string;
    email: string | null;
    institutionId: InstitutionId | null;
    breaking: boolean;
    independent: boolean;
    adjCore: boolean;
    institutionConflicts: InstitutionId[];
    teamConflicts: TeamId[];
    adjudicatorConflicts: AdjudicatorId[];
  },
  typeof adjudicatorSymbol
>;

export const AdjudicatorId = {
  ...Struct<AdjudicatorId>(),
};

export const Adjudicator = {
  ...Struct<Adjudicator>(),

  /**
   * Constructs entity from tabbycat DTO
   * @param dto The DTO object.
   * @param tournamentId The tournament id.
   * @param entity The original entity before update.
   * @returns Newly constructed entity with updates.
   */
  fromDto(
    dto: AdjudicatorDTO,
    tournamentId: TournamentId,
    entity?: Adjudicator,
  ): Adjudicator {
    if (entity !== undefined) {
      if (entity.tournamentId !== tournamentId) {
        throw_(new Error(`Tournament ID is immutable and should match.`));
      }
      if (entity.id !== dto.id) {
        throw_(new Error('Id is immutable and should match.'));
      }
      return Adjudicator.init({
        ...entity,
        name: dto.name,
        email: dto.email,
        institutionId: dto.institutionId,
        breaking: dto.breaking,
        independent: dto.independent,
        adjCore: dto.adjCore,
        institutionConflicts: dto.institutionConflicts,
        teamConflicts: dto.teamConflicts,
        adjudicatorConflicts: dto.adjudicatorConflicts,
      });
    } else {
      return Adjudicator.init({
        id: dto.id,
        tournamentId: tournamentId,
        name: dto.name,
        email: dto.email,
        institutionId: dto.institutionId,
        breaking: dto.breaking,
        independent: dto.independent,
        adjCore: dto.adjCore,
        institutionConflicts: dto.institutionConflicts,
        teamConflicts: dto.teamConflicts,
        adjudicatorConflicts: dto.adjudicatorConflicts,
      });
    }
  },
};
