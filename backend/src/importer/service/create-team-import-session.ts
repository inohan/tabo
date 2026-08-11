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
import { ImportSession, ImportTeamRow } from '../domain/models';
import { ImportSessionRepositoryPort } from '../domain/repository';
import { throw_ } from 'src/lib/throw';
import {
  checkTeam,
  serializeTeamDuplicationStatus,
} from '../domain/service/checker';
import { TeamQuery } from '@shared/infrastructure/query';

export class CreateTeamImportSessionService {
  constructor(
    private importSessionRepository: ImportSessionRepositoryPort,
    private teamQuery: TeamQuery,
  ) {}
  async execute({
    tournamentId,
    origin,
    auth,
    accessToken,
  }: {
    tournamentId: TournamentId;
    origin: ImportOrigin;
    auth?: OAuth2Client | GoogleAuth;
    accessToken?: string;
  }) {
    return await safeTry(
      async function* (this: CreateTeamImportSessionService) {
        const existingTeamPromise = this.teamQuery.getByTournamentId({
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
        const reverseMapping = new Map(
          indicesMapping
            .entries()
            .map(([filtered, original]) => [original, filtered]),
        );
        const checkResult = checkTeam(
          validTeamImports,
          await existingTeamPromise,
        );

        const rows = parseRowResults.map((rowResult, originalIndex) =>
          rowResult.match(
            (teamImport) => {
              const result =
                checkResult[
                  reverseMapping.get(originalIndex) ?? throw_(new Error())
                ];
              return ImportTeamRow.init({
                raw: data.data[originalIndex],
                success: true,
                parsedTeam: teamImport,
                matchedTeam:
                  result.match.existing !== null
                    ? TeamId.init(result.match.existing.id)
                    : null,
                updateNecessity: result.updateNecessity,
                duplication: serializeTeamDuplicationStatus(
                  result.duplicateStatus,
                  indicesMapping,
                ),
                doImport:
                  (result.updateNecessity.team === 'new' ||
                    result.updateNecessity.team === 'update') &&
                  !result.duplicateStatus.hasDuplicate,
              });
            },
            (error) =>
              ImportTeamRow.init({
                raw: data.data[originalIndex],
                success: false,
                error: error.message,
              }),
          ),
        );
        const importSession = ImportSession.create({
          tournamentId,
          origin,
          headers: data.headers,
          type: 'team',
          rows,
        });
        return await this.importSessionRepository.save(importSession);
      }.bind(this),
    );
  }
}
