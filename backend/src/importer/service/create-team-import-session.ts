import { ImportOrigin } from '../domain/values';
import { TeamId, TournamentId } from '@shared/domain/models';
import { ReadFileService } from './read-file';
import { GoogleAuth, OAuth2Client } from 'google-auth-library';
import { safeTry } from 'neverthrow';
import {
  groupTeamImportRow,
  parseGroupedTeamImportRow,
  parseRawTable,
} from '../domain/service/parser';
import { TeamImportSession, TeamImportRow } from '../domain/models';
import { TeamImportSessionRepositoryPort } from '../domain/repository';
import { throw_, throwUnexpected_ } from 'src/lib/throw';
import {
  checkTeam,
  getMissingBreakCategories,
  getMissingInstitutions,
  getMissingSpeakerCategories,
  serializeTeamDuplicationStatus,
} from '../domain/service/checker';
import {
  BreakCategoryQuery,
  InstitutionQuery,
  SpeakerCategoryQuery,
  TeamQuery,
} from '@shared/infrastructure/query';

export class CreateTeamImportSessionService {
  constructor(
    private importSessionRepository: TeamImportSessionRepositoryPort,
    private teamQuery: TeamQuery,
    private institutionQuery: InstitutionQuery,
    private breakCategoryQuery: BreakCategoryQuery,
    private speakerCategoryQuery: SpeakerCategoryQuery,
  ) {}
  async execute(
    {
      tournamentId,
      origin,
      auth,
      accessToken,
    }: {
      tournamentId: TournamentId;
      origin: ImportOrigin;
      auth?: OAuth2Client | GoogleAuth;
      accessToken?: string;
    },
    options?: {
      /**
       * Whether institutions for composite teams should be imported automatically.
       * *Note that institutions in institutional teams and institutional conflicts will automatically get imported.
       */
      insertCompositeTeamInstitution?: boolean;
    },
  ) {
    const insertCompositeTeamInstitution =
      options?.insertCompositeTeamInstitution ?? false;
    return await safeTry(
      async function* (this: CreateTeamImportSessionService) {
        const existingTeamsPromise = this.teamQuery.getByTournamentId({
          tournamentId,
        });
        const existingInstitutionsPromise =
          this.institutionQuery.getByTournamentId({
            tournamentId,
          });
        const existingBreakCategoryPromise =
          this.breakCategoryQuery.getByTournamentId({
            tournamentId,
          });
        const existingSpeakerCategoryPromise =
          this.speakerCategoryQuery.getByTournamentId({
            tournamentId,
          });
        const readService = new ReadFileService(origin, {
          auth,
          accessToken,
        });
        const data = yield* await readService.read();
        // Array of results (not vice versa)
        const parseRowResults = parseRawTable(data).map((rowResult) =>
          rowResult
            .andThen(groupTeamImportRow)
            .andThen(parseGroupedTeamImportRow),
        );
        const validTeamImports = parseRowResults
          .filter((result) => result.isOk())
          .map((result) => result.match((ok) => ok, throw_));
        /** Array[filteredIndex] -> originalIndex */
        const indicesMapping = parseRowResults
          .map((result, index) => ({ result, index }))
          .filter(({ result }) => result.isOk())
          .map(({ index }) => index);
        const checkResults = checkTeam(
          validTeamImports,
          await existingTeamsPromise,
        );
        const necessaryInstitutions = [
          ...checkResults
            .flatMap(({ teamImport }) => [
              teamImport.institution,
              ...(teamImport.institutionConflicts ?? []),
              ...(insertCompositeTeamInstitution
                ? teamImport.speakers.map((spk) => spk.institution)
                : []),
            ])
            .filter((institution) => institution !== null),
        ];
        const missingInstitutions = getMissingInstitutions(
          necessaryInstitutions,
          await existingInstitutionsPromise,
        );
        const missingBreakCategories = getMissingBreakCategories(
          checkResults.flatMap(({ teamImport }) => teamImport.breakCategories),
          await existingBreakCategoryPromise,
        );
        const missingSpeakerCategories = getMissingSpeakerCategories(
          checkResults.flatMap(({ teamImport }) =>
            teamImport.speakers.flatMap((spk) => spk.categories),
          ),
          await existingSpeakerCategoryPromise,
        );
        let filteredIndex = 0;
        const rows = parseRowResults.map((rowResult, originalIndex) =>
          rowResult.match(
            (teamImport) => {
              const checkResult =
                checkResults[filteredIndex++] ?? throwUnexpected_();
              return TeamImportRow.init({
                raw: data.data[originalIndex] ?? throwUnexpected_(),
                success: true,
                parsed: teamImport,
                matched:
                  checkResult.match.existing !== null
                    ? TeamId.init(checkResult.match.existing)
                    : null,
                updateNecessity: checkResult.updateNecessity,
                duplication: serializeTeamDuplicationStatus(
                  checkResult.duplicateStatus,
                  indicesMapping,
                ),
                doImport:
                  (checkResult.updateNecessity.team === 'new' ||
                    checkResult.updateNecessity.team === 'update') &&
                  !checkResult.duplicateStatus.hasDuplicate,
              });
            },
            (error) =>
              TeamImportRow.init({
                raw: data.data[originalIndex] ?? throwUnexpected_(),
                success: false,
                error: error.message,
              }),
          ),
        );
        const importSession = TeamImportSession.create({
          tournamentId,
          origin,
          headers: data.headers,
          rows,
          missingInstitutions,
          missingBreakCategories,
          missingSpeakerCategories,
        });
        return await this.importSessionRepository.save(importSession);
      }.bind(this),
    );
  }
}
