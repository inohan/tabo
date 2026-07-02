import { generateClientV1_3 } from './tabbycat-1-3';
import { Institution, InstitutionId, TournamentId } from 'src/shared/domain';

const BASE_URL = 'https://test-tab.com';
const TOURNAMENT_SLUG = 'test-tourney';
const TOURNAMENT_ID = TournamentId.init('tid-001');

function createClient() {
  return generateClientV1_3({
    token: 'test-token',
    baseUrl: BASE_URL,
    tournamentSlug: TOURNAMENT_SLUG,
  });
}

/**
 * Mock global.fetch to return JSON for requests whose URL contains `urlPattern`.
 *
 * Pass the raw JSON the Tabbycat API would return (snake_case keys).
 * The generated client's FromJSON functions handle deserialization.
 *
 * Usage:
 *   mockFetch('/api/v1/institutions', [
 *     { id: 1, name: 'MIT', code: 'MIT', venue_constraints: [] },
 *   ]);
 */
function mockFetch(urlPattern: string, body: unknown, status = 200) {
  jest
    .spyOn(global, 'fetch')
    .mockImplementation((input: string | URL | Request) => {
      const url =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.href
            : input.url;
      if (url.includes(urlPattern)) {
        return Promise.resolve(
          new Response(JSON.stringify(body), {
            status,
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      }
      throw new Error(`Unexpected fetch to ${url}`);
    });
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe('institutions', () => {
  test('tests institutions.list', async () => {
    mockFetch('/api/v1/institutions', [
      {
        id: 15,
        url: `${BASE_URL}/api/v1/institutions/15`,
        region: 'Johto',
        venue_constraints: [],
        name: 'Blackthorn City College',
        code: 'Blackthorn',
      },
      {
        id: 8,
        url: `${BASE_URL}/api/v1/institutions/8`,
        region: 'Kanto',
        venue_constraints: [],
        name: "Celadon City Trainers' Academy",
        code: 'Celadon',
      },
    ]);

    const client = createClient();
    const result = await client.institutions.list();

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toStrictEqual([
      Institution.init({
        id: InstitutionId.init(15),
        tournamentId: TOURNAMENT_ID,
        code: 'Blackthorn',
        name: 'Blackthorn City College',
      }),
      Institution.init({
        id: InstitutionId.init(8),
        tournamentId: TOURNAMENT_ID,
        name: "Celadon City Trainers' Academy",
        code: 'Celadon',
      }),
    ]);
  });

  test('test institutions.get', async () => {
    mockFetch('/api/v1/institutions/15', {
      id: 15,
      url: `${BASE_URL}/api/v1/institutions/15`,
      region: 'Johto',
      venue_constraints: [],
      name: 'Blackthorn City College',
      code: 'Blackthorn',
    });
    const client = createClient();
    const result = await client.institutions.get(InstitutionId.init(15));
    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toStrictEqual(
      Institution.init({
        id: InstitutionId.init(15),
        tournamentId: TOURNAMENT_ID,
        code: 'Blackthorn',
        name: 'Blackthorn City College',
      }),
    );
  });
});
