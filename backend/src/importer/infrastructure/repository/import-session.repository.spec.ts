import { createTestDb } from 'test/lib/db';
import { Db } from '../persistence/db';
import { sql } from 'kysely';
import { ImportSessionRepository } from './import-session.repository';
import { expectErrResult, expectOkResult } from 'test/lib/expect-result';
import { SaveFailedError, TournamentId } from '@shared/domain';
import { castJson } from 'src/lib/json';
import {
  ImportSession,
  ImportSessionId,
  ImportTeamRow,
} from '@importer/domain/models/import-session';

const generateTeamImportSession = () =>
  ImportSession.create({
    tournamentId: TournamentId.init('test_tournament'),
    type: 'team',
    headers: ['reference', 'institution', 'breakCategories'],
    origin: {
      type: 'csv',
      id: 'test_csv',
    },
    rows: [
      ImportTeamRow.init({
        raw: ['Team A', 'Institution A', 'open, esl'],
        success: true,
        parsedTeam: {
          reference: 'Team A',
          institution: 'Institution A',
          breakCategories: ['open', 'esl'],
          speakers: [],
        },
        matchedTeam: null,
        updateNecessity: {
          team: 'new',
        },
        duplication: {
          hasDuplicate: false,
        },
        doImport: true,
      }),
      ImportTeamRow.init({
        raw: [null, 'Institution B', null],
        success: false,
        error: 'Missing reference',
      }),
    ],
  }) as Extract<ImportSession, { type: 'team' }>;

describe('Importer DB', () => {
  let db: Db;
  let repository: ImportSessionRepository;
  beforeAll(() => {
    db = createTestDb('importer');
    repository = new ImportSessionRepository(db);
  });

  beforeEach(async () => {
    await sql`TRUNCATE TABLE importer.import_session CASCADE`.execute(db);
  });

  afterAll(async () => {
    await db.destroy();
  });

  test('Getting team session', async () => {
    const timestamp = new Date();
    await db
      .insertInto('importSession')
      .values({
        sessionId: 'test_session',
        tournamentId: 'test_tournament',
        origin: castJson({
          type: 'csv',
          id: 'test_csv',
        }),
        type: 'team',
        headers: castJson(['reference', 'institution', 'breakCategories']),
        createdAt: timestamp,
        updatedAt: timestamp,
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
          matched: null,
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
    const importSession = expectOkResult(
      await repository.get({
        tournamentId: TournamentId.init('test_tournament'),
        type: 'team',
      }),
    );
    expect(importSession).toEqual({
      sessionId: 'test_session',
      tournamentId: 'test_tournament',
      origin: {
        type: 'csv',
        id: 'test_csv',
      },
      headers: ['reference', 'institution', 'breakCategories'],
      createdAt: timestamp,
      updatedAt: timestamp,
      type: 'team',
      rows: [
        {
          raw: ['Team A', 'Institution A', 'open, esl'],
          success: true,
          parsedTeam: {
            speakers: [],
            institution: 'Institution A',
            reference: 'Team A',
            breakCategories: ['open', 'esl'],
          },
          matchedTeam: null,
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
    const retrievedImportSession = expectOkResult(
      await repository.get({
        tournamentId: TournamentId.init('test_tournament'),
        type: 'team',
      }),
    );
    expect(retrievedImportSession).toEqual(importSession);
  });

  test('Import session can be overwritten', async () => {
    const importSession = generateTeamImportSession();
    expectOkResult(await repository.save(importSession));
    const updatedAt = new Date();
    const newImportTeamRow = ImportTeamRow.init({
      raw: ['Team C', 'Institution C', 'open'],
      success: true,
      parsedTeam: {
        reference: 'Team C',
        institution: 'Institution C',
        breakCategories: ['open'],
        speakers: [],
      },
      matchedTeam: null,
      updateNecessity: {
        team: 'new',
      },
      duplication: {
        hasDuplicate: false,
      },
      doImport: true,
    });
    const newImportSession = ImportSession.init({
      ...importSession,
      updatedAt,
      rows: [newImportTeamRow],
    });
    expectOkResult(await repository.save(newImportSession));
    const retrievedImportSession = expectOkResult(
      await repository.get({
        tournamentId: TournamentId.init('test_tournament'),
        type: 'team',
      }),
    );
    expect(retrievedImportSession).toEqual(newImportSession);
  });

  test('Saving import session when there is another session raises error', async () => {
    const importSession = generateTeamImportSession();
    expectOkResult(await repository.save(importSession));
    const duplicateImportSession = ImportSession.init({
      sessionId: ImportSessionId.init('different_session'),
      tournamentId: TournamentId.init('test_tournament'),
      type: 'team',
      createdAt: new Date(),
      updatedAt: new Date(),
      headers: [],
      origin: {
        type: 'google-sheets',
        id: 'test_google_sheet_id',
        tableId: 'test_table_id',
      },
      rows: [],
    });
    expectErrResult(
      await repository.save(duplicateImportSession),
      SaveFailedError,
    );
  });
});
