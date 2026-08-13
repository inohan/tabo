import { TeamImportFailedError } from '@importer/domain/error';
import {
  TeamImportSession,
  TeamImportSessionId,
} from '@importer/domain/models';
import { TeamImportSessionRepositoryPort } from '@importer/domain/repository';
import { TeamImportSessionFailedMissingEntities } from '@importer/domain/values';
import { ClientFactoryPort } from '@shared/clients/tabbycat';
import {
  BreakCategoryId,
  InstitutionId,
  PartialFailedError,
  SpeakerCategoryId,
  TournamentId,
} from '@shared/domain';
import {
  BreakCategoryRepositoryPort,
  InstitutionRepositoryPort,
  SpeakerCategoryRepositoryPort,
  TournamentRepositoryPort,
  UnitOfWorkPort,
} from '@shared/domain/repository';
import {
  BreakCategoryQuery,
  InstitutionQuery,
  SpeakerCategoryQuery,
} from '@shared/infrastructure/query';
import {
  CreateBreakCategoryService,
  CreateInstitutionService,
  CreateSpeakerCategoryService,
  CreateTeamService,
} from '@shared/service';
import { err, ok, safeTry } from 'neverthrow';
import { throwUnexpected_ } from 'src/lib/throw';
import { match, P } from 'ts-pattern';

export class TeamImportService {
  constructor(
    private teamImportSessionRepository: TeamImportSessionRepositoryPort,
    private tournamentRepository: TournamentRepositoryPort,
    private institutionRepository: InstitutionRepositoryPort,
    private institutionQuery: InstitutionQuery,
    private breakCategoryRepository: BreakCategoryRepositoryPort,
    private breakCategoryQuery: BreakCategoryQuery,
    private speakerCategoryRepository: SpeakerCategoryRepositoryPort,
    private speakerCategoryQuery: SpeakerCategoryQuery,
    private unitOfWork: UnitOfWorkPort,
    private tabbycatClientFactory: ClientFactoryPort,
  ) {}

  async execute({
    tournamentId,
    importSessionId,
  }: {
    tournamentId: TournamentId;
    importSessionId: TeamImportSessionId;
  }) {
    return safeTry(
      async function* (this: TeamImportService) {
        const importSession = yield* await this.teamImportSessionRepository.get(
          {
            tournamentId,
            importSessionId,
          },
        );
        const createInstitutionService = new CreateInstitutionService(
          this.tournamentRepository,
          this.institutionRepository,
          this.tabbycatClientFactory,
        );
        const createBreakCategoryService = new CreateBreakCategoryService(
          this.tournamentRepository,
          this.breakCategoryRepository,
          this.tabbycatClientFactory,
        );
        const createSpeakerCategoryService = new CreateSpeakerCategoryService(
          this.tournamentRepository,
          this.speakerCategoryRepository,
          this.tabbycatClientFactory,
        );
        const [bcMaxSeq, scMaxSeq] = await Promise.all([
          this.breakCategoryQuery.getMaxSeq({ tournamentId }),
          this.speakerCategoryQuery.getMaxSeq({ tournamentId }),
        ]);
        const [institutionResult, breakCategoryResult, speakerCategoryResult] =
          await Promise.all([
            createInstitutionService.executeMany(
              tournamentId,
              importSession.missingInstitutions.map((code) => ({
                name: code,
                code,
              })),
              {
                sync: true,
              },
            ),
            createBreakCategoryService.executeMany(
              tournamentId,
              importSession.missingBreakCategories.map((slug, idx) => ({
                name: slug,
                slug,
                isGeneral: false,
                breakSize: 4,
                seq: (bcMaxSeq ?? 0) + idx + 1,
                priority: 100,
              })),
              {
                sync: true,
              },
            ),
            createSpeakerCategoryService.executeMany(
              tournamentId,
              importSession.missingSpeakerCategories.map((slug, idx) => ({
                name: slug,
                slug,
                seq: (scMaxSeq ?? 0) + idx + 1,
              })),
            ),
          ]);
        // Import of institution, break category, or speaker category have failed
        if (
          institutionResult.isErr() ||
          breakCategoryResult.isErr() ||
          speakerCategoryResult.isErr()
        ) {
          const importSessionFailedReason: TeamImportSessionFailedMissingEntities =
            {
              type: 'missing-entities',
              institutions: yield* institutionResult.match(
                () => ok([]),
                (e) =>
                  match(e)
                    .with(P.instanceOf(PartialFailedError), (e) =>
                      ok(
                        e.cause
                          .map((rowResult, index) =>
                            rowResult.match(
                              () => undefined,
                              (err) => ({
                                code:
                                  importSession.missingInstitutions[index] ??
                                  throwUnexpected_(),
                                reason: err.message,
                              }),
                            ),
                          )
                          .filter((i) => i !== undefined),
                      ),
                    )
                    .otherwise((e) => err(e)),
              ),
              breakCategories: yield* breakCategoryResult.match(
                () => ok([]),
                (e) =>
                  match(e)
                    .with(P.instanceOf(PartialFailedError), (e) =>
                      ok(
                        e.cause
                          .map((rowResult, index) =>
                            rowResult.match(
                              () => undefined,
                              (err) => ({
                                slug:
                                  importSession.missingBreakCategories[index] ??
                                  throwUnexpected_(),
                                reason: err.message,
                              }),
                            ),
                          )
                          .filter((i) => i !== undefined),
                      ),
                    )
                    .otherwise((e) => err(e)),
              ),
              speakerCategories: yield* speakerCategoryResult.match(
                () => ok([]),
                (e) =>
                  match(e)
                    .with(P.instanceOf(PartialFailedError), (e) =>
                      ok(
                        e.cause
                          .map((rowResult, index) =>
                            rowResult.match(
                              () => undefined,
                              (err) => ({
                                slug:
                                  importSession.missingSpeakerCategories[
                                    index
                                  ] ?? throwUnexpected_(),
                                reason: err.message,
                              }),
                            ),
                          )
                          .filter((i) => i !== undefined),
                      ),
                    )
                    .otherwise((e) => err(e)),
              ),
            };
          const updatedSession = TeamImportSession.updateStatusMissingEntities(
            importSession,
            importSessionFailedReason,
          );
          yield* await this.teamImportSessionRepository.save(updatedSession);
          return err(new TeamImportFailedError(importSessionFailedReason));
        }
        const [
          existingInstitutions,
          existingBreakCategories,
          existingSpeakerCategories,
        ] = await Promise.all([
          this.institutionQuery.getByTournamentId({ tournamentId }),
          this.breakCategoryQuery.getByTournamentId({ tournamentId }),
          this.speakerCategoryQuery.getByTournamentId({ tournamentId }),
        ]);
        const existingInstitutionsMap = new Map(
          existingInstitutions.map((dto) => [
            dto.code,
            InstitutionId.init(dto.id),
          ]),
        );
        const existingBreakCategoriesMap = new Map(
          existingBreakCategories.map((dto) => [
            dto.slug,
            BreakCategoryId.init(dto.id),
          ]),
        );
        const existingSpeakerCategoriesMap = new Map(
          existingSpeakerCategories.map((dto) => [
            dto.slug,
            SpeakerCategoryId.init(dto.id),
          ]),
        );
        // Import teams
        const createTeamService = new CreateTeamService(
          this.tournamentRepository,
          this.unitOfWork,
          this.tabbycatClientFactory,
        );
        const rowsToImport = importSession.rows.filter((row) => row.success);
        const teamResult = await createTeamService.executeMany(
          tournamentId,
          rowsToImport.map(({ parsed }) => ({
            reference: parsed.reference,
            institutionId:
              parsed.institution !== null
                ? (existingInstitutionsMap.get(parsed.institution) ??
                  throwUnexpected_())
                : null,
            breakCategories: parsed.breakCategories.map(
              (bcSlug) =>
                existingBreakCategoriesMap.get(bcSlug) ?? throwUnexpected_(),
            ),
            codeName: parsed.codeName,
            emoji: parsed.emoji,
            shortReference: parsed.shortReference,
            useInstitutionPrefix: parsed.useInstitutionPrefix,
            institutionConflicts:
              parsed.institutionConflicts !== undefined
                ? parsed.institutionConflicts.map(
                    (instCode) =>
                      existingInstitutionsMap.get(instCode) ??
                      throwUnexpected_(),
                  )
                : undefined,
            speakers: parsed.speakers.map((speaker) => ({
              name: speaker.name,
              categories: speaker.categories.map(
                (scSlug) =>
                  existingSpeakerCategoriesMap.get(scSlug) ??
                  throwUnexpected_(),
              ),
              anonymous: speaker.anonymous,
              email: speaker.email,
              institution: speaker.institution,
            })),
          })),
        );
        // Write results
        const updatedSession = yield* teamResult.match(
          (ids) =>
            ok(TeamImportSession.updateStatusSuccess(importSession, ids)),
          (e) =>
            match(e)
              .with(P.instanceOf(PartialFailedError), (e) =>
                ok(TeamImportSession.updateStatusNewTeams(importSession, e)),
              )
              .otherwise((e) => err(e)),
        );
        // Change import session status
        await this.teamImportSessionRepository.save(updatedSession);
        // TODO: Update teams
        // TODO: Write back
        return ok();
      }.bind(this),
    );
  }
}
