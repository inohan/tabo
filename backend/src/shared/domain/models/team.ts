import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';
import { SpeakerId } from './speaker';
import { InstitutionId } from './institution';
import { BreakCategoryId } from './break-category';
import { TeamDTO } from '@shared/clients/tabbycat';
import { throw_ } from 'src/lib/throw';
export declare const teamSymbol: unique symbol;
export declare const teamIdSymbol: unique symbol;

export type TeamId = Branded<number, typeof teamIdSymbol>;

export type Team = Branded<
  {
    readonly id: TeamId;
    readonly tournamentId: TournamentId;
    reference: string;
    shortReference: string;
    institutionId: InstitutionId | null;
    institutionConflicts: InstitutionId[];
    readonly speakers: SpeakerId[];
    breakCategories: BreakCategoryId[];
    emoji: string | null;
    codeName: string;
    useInstitutionPrefix: boolean;
    readonly shortName: string;
    readonly longName: string;
  },
  typeof teamSymbol
>;

export const TeamId = {
  ...Struct<TeamId>(),
};

export const Team = {
  ...Struct<Team>(),

  /**
   * Constructs entity from tabbycat DTO.
   *
   * The DTO nests whole speakers; the entity only holds their ids.
   * @param dto The DTO object.
   * @param tournamentId The tournament id.
   * @param entity The original entity before update.
   * @returns Newly constructed entity with updates.
   */
  fromDto(dto: TeamDTO, tournamentId: TournamentId, entity?: Team): Team {
    if (entity !== undefined) {
      if (entity.tournamentId !== tournamentId) {
        throw_(new Error(`Tournament ID is immutable and should match.`));
      }
      if (entity.id !== dto.id) {
        throw_(new Error('Id is immutable and should match.'));
      }
      return Team.init({
        ...entity,
        reference: dto.reference,
        shortReference: dto.shortReference,
        institutionId: dto.institutionId,
        institutionConflicts: dto.institutionConflicts,
        speakers: dto.speakers.map((spk) => spk.id),
        breakCategories: dto.breakCategories,
        emoji: dto.emoji,
        codeName: dto.codeName,
        useInstitutionPrefix: dto.useInstitutionPrefix,
        shortName: dto.shortName,
        longName: dto.longName,
      });
    } else {
      return Team.init({
        id: dto.id,
        tournamentId: tournamentId,
        reference: dto.reference,
        shortReference: dto.shortReference,
        institutionId: dto.institutionId,
        institutionConflicts: dto.institutionConflicts,
        speakers: dto.speakers.map((spk) => spk.id),
        breakCategories: dto.breakCategories,
        emoji: dto.emoji,
        codeName: dto.codeName,
        useInstitutionPrefix: dto.useInstitutionPrefix,
        shortName: dto.shortName,
        longName: dto.longName,
      });
    }
  },
};
