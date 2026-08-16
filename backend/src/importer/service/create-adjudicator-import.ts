import { ImportOrigin } from '../domain/values';
import { AdjudicatorId, TournamentId } from '@shared/domain/models';
import { ReadFileService } from './read-file';
import { GoogleAuth, OAuth2Client } from 'google-auth-library';
import { safeTry } from 'neverthrow';
import {
  parseAdjudicatorImportRow,
  parseRawTable,
} from '../domain/service/parser';
import {
  AdjudicatorImportSession,
  AdjudicatorImportRow,
} from '../domain/models';
import { AdjudicatorImportSessionRepositoryPort } from '../domain/repository';
import { throw_, throwUnexpected_ } from 'src/lib/throw';
import {
  checkAdjudicator,
  getMissingInstitutions,
  serializeAdjudicatorDuplicationStatus,
} from '../domain/service/checker';
import {
  AdjudicatorQuery,
  InstitutionQuery,
} from '@shared/infrastructure/query';

export class CreateAdjudicatorImportSessionService {
  constructor(
    private importSessionRepository: AdjudicatorImportSessionRepositoryPort,
    private adjudicatorQuery: AdjudicatorQuery,
    private institutionQuery: InstitutionQuery,
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
        const existingInstitutionsPromise =
          this.institutionQuery.getByTournamentId({
            tournamentId,
          });
        const readService = new ReadFileService();
        const data = yield* await readService.read(origin, { type: 'none' });
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
        const checkResults = checkAdjudicator(
          validAdjudicatorImports,
          await existingAdjudicatorPromise,
        );
        const necessaryInstitutions = [
          ...checkResults
            .map(({ adjudicatorImport }) => adjudicatorImport.institution)
            .filter((institution) => institution !== null),
        ];
        const missingInstitutions = getMissingInstitutions(
          necessaryInstitutions,
          await existingInstitutionsPromise,
        );
        let filteredIndex = 0;
        const rows = parseRowResults.map((rowResult, originalIndex) =>
          rowResult.match(
            (adjudicatorImport) => {
              const checkResult =
                checkResults[filteredIndex++] ?? throwUnexpected_();
              return AdjudicatorImportRow.init({
                raw: data.data[originalIndex] ?? throwUnexpected_(),
                success: true,
                parsed: adjudicatorImport,
                matched:
                  checkResult.match.existing !== null
                    ? AdjudicatorId.init(checkResult.match.existing)
                    : null,
                updateNecessity: checkResult.updateNecessity,
                duplication: serializeAdjudicatorDuplicationStatus(
                  checkResult.duplicateStatus,
                  indicesMapping,
                ),
                doImport:
                  (checkResult.updateNecessity.adjudicator === 'new' ||
                    checkResult.updateNecessity.adjudicator === 'update') &&
                  !checkResult.duplicateStatus.hasDuplicate,
              });
            },
            (error) =>
              AdjudicatorImportRow.init({
                raw: data.data[originalIndex] ?? throwUnexpected_(),
                success: false,
                error: error.message,
              }),
          ),
        );
        const importSession = AdjudicatorImportSession.create({
          tournamentId,
          origin,
          headers: data.headers,
          rows,
          missingInstitutions,
        });
        return await this.importSessionRepository.save(importSession);
      }.bind(this),
    );
  }
}
