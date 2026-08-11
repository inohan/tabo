import { ImportOrigin } from '../domain/values';
import { AdjudicatorId, TournamentId } from '@shared/domain/models';
import { ReadFileService } from './read-file';
import { GoogleAuth, OAuth2Client } from 'google-auth-library';
import { safeTry } from 'neverthrow';
import {
  parseAdjudicatorImportRow,
  parseRawTable,
} from '../domain/service/parser';
import { ImportSession, ImportAdjudicatorRow } from '../domain/models';
import { ImportSessionRepositoryPort } from '../domain/repository';
import { throw_ } from 'src/lib/throw';
import {
  checkAdjudicator,
  serializeAdjudicatorDuplicationStatus,
} from '../domain/service/checker';
import { AdjudicatorQuery } from '@shared/infrastructure/query';

export class CreateAdjudicatorImportSessionService {
  constructor(
    private importSessionRepository: ImportSessionRepositoryPort,
    private adjudicatorQuery: AdjudicatorQuery,
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
      async function* (this: CreateAdjudicatorImportSessionService) {
        const existingAdjudicatorPromise =
          this.adjudicatorQuery.getByTournamentId({
            tournamentId,
          });
        const readService = new ReadFileService(origin, {
          auth,
          accessToken,
        });
        const data = yield* await readService.read();
        // Array of results (not vice versa)
        const parseRowResults = parseRawTable(data).map((rowResult) =>
          rowResult.andThen(parseAdjudicatorImportRow),
        );
        const validAdjudicatorImports = parseRowResults
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
        const checkResult = checkAdjudicator(
          validAdjudicatorImports,
          await existingAdjudicatorPromise,
        );

        const rows = parseRowResults.map((rowResult, originalIndex) =>
          rowResult.match(
            (adjudicatorImport) => {
              const result =
                checkResult[
                  reverseMapping.get(originalIndex) ?? throw_(new Error())
                ];
              return ImportAdjudicatorRow.init({
                raw: data.data[originalIndex],
                success: true,
                parsedAdjudicator: adjudicatorImport,
                matchedAdjudicator:
                  result.match.existing !== null
                    ? AdjudicatorId.init(result.match.existing.id)
                    : null,
                updateNecessity: result.updateNecessity,
                duplication: serializeAdjudicatorDuplicationStatus(
                  result.duplicateStatus,
                  indicesMapping,
                ),
                doImport:
                  (result.updateNecessity.adjudicator === 'new' ||
                    result.updateNecessity.adjudicator === 'update') &&
                  !result.duplicateStatus.hasDuplicate,
              });
            },
            (error) =>
              ImportAdjudicatorRow.init({
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
          type: 'adjudicator',
          rows,
        });
        return await this.importSessionRepository.save(importSession);
      }.bind(this),
    );
  }
}
