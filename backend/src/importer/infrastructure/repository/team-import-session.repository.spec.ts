import { createTestDb } from 'test/lib/db';
import { Db } from '../persistence/db';
import { sql } from 'kysely';
import { TeamImportSessionRepository } from './team-import-session.repository';
import { expectErrResult, expectOkResult } from 'test/lib/expect-result';
import { SaveFailedError, TournamentId } from '@shared/domain';
import { castJson } from 'src/lib/json';
import {
  TeamImportSession,
  TeamImportSessionId,
  TeamImportRow,
} from '@importer/domain/models/team-import-session';

const generateTeamImportSession = () =>
  TeamImportSession.create({
    tournamentId: TournamentId.init('test_tournament'),
    headers: ['reference', 'institution', 'breakCategories'],
    origin: {
      type: 'csv',
      id: 'test_csv',
    },
    rows: [
      TeamImportRow.init({
        raw: ['Team A', 'Institution A', 'open, esl'],
        success: true,
        parsed: {
          reference: 'Team A',
          institution: 'Institution A',
          breakCategories: ['open', 'esl'],
          speakers: [],
        },
        matched: {
          existing: null,
        },
        updateNecessity: {
          team: 'new',
        },
        duplication: {
          hasDuplicate: false,
        },
        doImport: true,
      }),
      TeamImportRow.init({
        raw: [null, 'Institution B', null],
        success: false,
        error: 'Missing reference',
      }),
    ],
  });

describe('Importer DB', () => {
  let db: Db;
  let repository: TeamImportSessionRepository;
  beforeAll(() => {
    db = createTestDb('importer');
    repository = new TeamImportSessionRepository(db);
  });

  beforeEach(async () => {
    await sql`TRUNCATE TABLE importer.team_import_session CASCADE`.execute(db);
  });

  afterAll(async () => {
    await db.destroy();
  });

  test('Getting team session', async () => {
    const timestamp = new Date();
    await db
      .insertInto('teamImportSession')
      .values({
        sessionId: 'test_session',
        tournamentId: 'test_tournament',
        origin: castJson({
          type: 'csv',
          id: 'test_csv',
        }),
        headers: castJson(['reference', 'institution', 'breakCategories']),
        createdAt: timestamp,
        updatedAt: timestamp,
        status: 'incomplete',
      })
      .execute();
    await db
      .insertInto('importTeamRow')
      .values([
        {
          sessionId: 'test_session',
          seq: 0,
          raw: castJson(['Team A', 'Institution A', 'open, esl']),
          success: true,
          error: null,
          parsed: castJson({
            speakers: [],
            institution: 'Institution A',
            reference: 'Team A',
            breakCategories: ['open', 'esl'],
          }),
          matched: castJson({ existing: null }),
          updateNecessity: castJson({
            team: 'new',
          }),
          duplication: castJson({
            hasDuplicate: false,
          }),
          doImport: true,
        },
        {
          sessionId: 'test_session',
          seq: 1,
          raw: castJson([null, 'Institution B', null]),
          success: false,
          error: 'Missing reference',
          parsed: null,
          matched: null,
          updateNecessity: null,
          duplication: null,
          doImport: null,
        },
      ])
      .execute();
    const importSessions = expectOkResult(
      await repository.getByTournament({
        tournamentId: TournamentId.init('test_tournament'),
      }),
    );
    expect(importSessions.length).toBe(1);
    expect(importSessions[0]).toEqual({
      id: 'test_session',
      tournamentId: 'test_tournament',
      origin: {
        type: 'csv',
        id: 'test_csv',
      },
      headers: ['reference', 'institution', 'breakCategories'],
      missingInstitutions: ['Institution A'],
      missingBreakCategories: ['esl'],
      missingSpeakerCategories: [],
      createdAt: timestamp,
      updatedAt: timestamp,
      status: 'incomplete',
      rows: [
        {
          raw: ['Team A', 'Institution A', 'open, esl'],
          success: true,
          parsed: {
            speakers: [],
            institution: 'Institution A',
            reference: 'Team A',
            breakCategories: ['open', 'esl'],
          },
          matched: null,
          updateNecessity: {
            team: 'new',
          },
          duplication: {
            hasDuplicate: false,
          },
          doImport: true,
        },
        {
          raw: [null, 'Institution B', null],
          success: false,
          error: 'Missing reference',
        },
      ],
    });
  });

  test('New import session can be saved', async () => {
    const importSession = generateTeamImportSession();
    expectOkResult(await repository.save(importSession));
    const retrievedTeamImportSession = expectOkResult(
      await repository.get({
        tournamentId: TournamentId.init('test_tournament'),
        importSessionId: importSession.id,
      }),
    );
    expect(retrievedTeamImportSession).toEqual(importSession);
  });

  test('Import session can be overwritten', async () => {
    const importSession = generateTeamImportSession();
    expectOkResult(await repository.save(importSession));
    const updatedAt = new Date();
    const newImportTeamRow = TeamImportRow.init({
      raw: ['Team C', 'Institution C', 'open'],
      success: true,
      parsed: {
        reference: 'Team C',
        institution: 'Institution C',
        breakCategories: ['open'],
        speakers: [],
      },
      matched: {
        existing: null,
      },
      updateNecessity: {
        team: 'new',
      },
      duplication: {
        hasDuplicate: false,
      },
      doImport: true,
    });
    const newTeamImportSession = TeamImportSession.init({
      ...importSession,
      updatedAt,
      rows: [newImportTeamRow],
    });
    expectOkResult(await repository.save(newTeamImportSession));
    const retrievedTeamImportSessions = expectOkResult(
      await repository.get({
        tournamentId: TournamentId.init('test_tournament'),
        importSessionId: importSession.id,
      }),
    );
    expect(retrievedTeamImportSessions).toEqual(newTeamImportSession);
  });

  test('Saving import session when there is another session raises error', async () => {
    const importSession = generateTeamImportSession();
    expectOkResult(await repository.save(importSession));
    const duplicateTeamImportSession = TeamImportSession.init({
      id: TeamImportSessionId.init('different_session'),
      tournamentId: TournamentId.init('test_tournament'),
      createdAt: new Date(),
      updatedAt: new Date(),
      headers: [],
      origin: {
        type: 'google-sheets',
        id: 'test_google_sheet_id',
        tableId: 'test_table_id',
      },
      rows: [],
      status: 'incomplete',
    });
    expectErrResult(
      await repository.save(duplicateTeamImportSession),
      SaveFailedError,
    );
  });

  test.todo(
    'If session status is not incomplete, changing an import session status raises error',
  );
});
