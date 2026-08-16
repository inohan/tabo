import { ImportOrigin } from '../domain/values';
import { TournamentId } from '@shared/domain/models';
import { ReadFileService } from './read-file';
import { ok, Result, safeTry } from 'neverthrow';
import {
  groupTeamImportRow,
  parseGroupedTeamImportRow,
  parseRawTable,
} from '../domain/service/parser';
import {
  TeamImportSession,
  TeamImportRow,
  TeamImportSessionId,
} from '../domain/models';
import { TeamImportSessionRepositoryPort } from '../domain/repository';
import { throw_, throwUnexpected_ } from 'src/lib/throw';
import {
  checkTeam,
  serializeTeamDuplicationStatus,
} from '../domain/service/checker';
import {
  BreakCategoryQuery,
  InstitutionQuery,
  SpeakerCategoryQuery,
  TeamQuery,
} from '@shared/infrastructure/query';
import { ImportCredentials } from '@importer/domain/values/import-credentials';
import { AuthError, NotFoundError, SaveFailedError } from '@shared/domain';

export class CreateTeamImportSessionService {
  constructor(
    private importSessionRepository: TeamImportSessionRepositoryPort,
    private teamQuery: TeamQuery,
    private institutionQuery: InstitutionQuery,
    private breakCategoryQuery: BreakCategoryQuery,
    private speakerCategoryQuery: SpeakerCategoryQuery,
    private readFileService: ReadFileService,
  ) {}
  async execute({
    tournamentId,
    origin,
    credentials,
  }: {
    tournamentId: TournamentId;
    origin: ImportOrigin;
    credentials: ImportCredentials;
  }): Promise<
    Result<TeamImportSessionId, AuthError | NotFoundError | SaveFailedError>
  > {
    return await safeTry(
      async function* (this: CreateTeamImportSessionService) {
        const existingTeamsPromise = this.teamQuery.getByTournamentId({
          tournamentId,
        });
        const data = yield* await this.readFileService.read(
          origin,
          credentials,
        );
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
                matched: checkResult.match,
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
        });
        yield* await this.importSessionRepository.save(importSession);
        return ok(importSession.id);
      }.bind(this),
    );
  }
}
