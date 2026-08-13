import { TeamImport, TeamMatchStatus } from '@importer/domain/values';
import { getTeamUpdateNecessity } from './compare';
import { TeamDto } from '@shared/infrastructure/query';

describe(getTeamUpdateNecessity, () => {
  const teamDto: TeamDto = {
    tournamentId: 'test_tournament',
    id: 1,
    reference: 'Team A',
    shortReference: 'Team A',
    institution: 1,
    institutionConflicts: [1],
    breakCategories: [1],
    emoji: '😀',
    codeName: 'Smiley Face',
    useInstitutionPrefix: false,
    shortName: 'Team A',
    longName: 'Team A',
    speakers: [
      {
        id: 1,
        name: 'Speaker A1',
        categories: [1],
        anonymous: false,
        email: 'speakera1@example.com',
        institution: 1,
      },
      {
        id: 2,
        name: 'Speaker A2',
        categories: [1],
        anonymous: false,
        email: 'speakera2@example.com',
        institution: 1,
      },
    ],
  };
  test('If no match, return as new', () => {
    const teamImport: TeamImport = {
      reference: 'Team A',
      institution: 'Institution A',
      breakCategories: ['open'],
      speakers: [
        {
          name: 'Speaker A1',
          institution: 'Institution A',
          categories: ['open'],
          email: 'speakera1@example.com',
        },
        {
          name: 'Speaker A2',
          institution: 'Institution A',
          categories: ['open'],
          email: 'speakera2@example.com',
        },
      ],
    };
    const matched: TeamMatchStatus = {
      existing: null,
    };
    const updateNecessity = getTeamUpdateNecessity(teamImport, matched);
    expect(updateNecessity.team).toEqual('new');
  });

  test('If identical, return as match', () => {
    const teamImport: TeamImport = {
      reference: 'Team A',
      institution: 'Institution A',
      breakCategories: ['open'],
      speakers: [
        {
          name: 'Speaker A1',
          institution: 'Institution A',
          categories: ['open'],
          email: 'speakera1@example.com',
        },
        {
          name: 'Speaker A2',
          institution: 'Institution A',
          categories: ['open'],
          email: 'speakera2@example.com',
        },
      ],
    };
    const matched: TeamMatchStatus = {
      existing: teamDto.id,
      matchedBy: {
        id: false,
        reference: true,
        speakers: {
          matched: 2,
          total: 2,
        },
      },
      speakers: [
        {
          existing: teamDto.speakers[0]!.id,
          matchedBy: {
            id: false,
            name: true,
            email: true,
          },
        },
        {
          existing: teamDto.speakers[1]!.id,
          matchedBy: {
            id: false,
            name: true,
            email: true,
          },
        },
      ],
    };
    const updateNecessity = getTeamUpdateNecessity(teamImport, matched);
    expect(updateNecessity.team).toEqual('match');
  });

  test.fails('If part of team is different, return as update', () => {
    const teamImport: TeamImport = {
      reference: 'Team A',
      institution: 'Institution B',
      breakCategories: ['open', 'esl'],
      speakers: [
        {
          name: 'Speaker A1',
          institution: 'Institution A',
          categories: ['open'],
          email: 'speakera1@example.com',
        },
        {
          name: 'Speaker A2',
          institution: 'Institution A',
          categories: ['open'],
          email: 'speakera2@example.com',
        },
      ],
    };
    const matched: TeamMatchStatus = {
      existing: teamDto.id,
      matchedBy: {
        id: false,
        reference: true,
        speakers: {
          matched: 2,
          total: 2,
        },
      },
      speakers: [
        {
          existing: teamDto.speakers[0]!.id,
          matchedBy: {
            id: false,
            name: true,
            email: true,
          },
        },
        {
          existing: teamDto.speakers[1]!.id,
          matchedBy: {
            id: false,
            name: true,
            email: true,
          },
        },
      ],
    };
    const updateNecessity = getTeamUpdateNecessity(teamImport, matched);
    expect(updateNecessity.team).toEqual('update');
    if (updateNecessity.team === 'update') {
      expect(updateNecessity.fields).toEqual([
        'institution',
        'breakCategories',
      ]);
    }
  });

  test.todo('If part of speaker is different, return update');
});
