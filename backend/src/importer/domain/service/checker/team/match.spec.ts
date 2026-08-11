import { SpeakerImport, TeamImport } from '@importer/domain/values';
import { TeamDto, TeamSpeakerDto } from '@shared/infrastructure/query';
import {
  matchSpeakerImportWithExistingSpeakers,
  matchTeamImportWithExistingTeams,
} from './match';

describe(matchSpeakerImportWithExistingSpeakers, () => {
  const existingSpeakers: TeamSpeakerDto[] = [
    {
      id: 1,
      name: 'Speaker 1',
      institution: 1,
      categories: [1, 2, 3],
      email: 'speaker1@example.com',
      anonymous: false,
    },
    {
      id: 2,
      name: 'Speaker 2',
      institution: 2,
      categories: [1, 2],
      email: 'speaker2@example.com',
      anonymous: false,
    },
    {
      id: 3,
      name: 'Speaker 3',
      institution: 1,
      categories: [1],
      email: null,
      anonymous: false,
    },
    {
      id: 4,
      name: 'Speaker 4',
      institution: 1,
      categories: [1, 2],
      email: null,
      anonymous: false,
    },
    {
      id: 5,
      name: 'Speaker 5',
      institution: 1,
      categories: [1, 2],
      email: 'speaker5@example.com',
      anonymous: false,
    },
  ];
  test('Nothing is matched if id is provided but the id does not exist', () => {
    const speakerImport: SpeakerImport = {
      id: 42,
      name: 'Speaker 1',
      institution: null,
      categories: ['open', 'esl'],
    };
    const matched = matchSpeakerImportWithExistingSpeakers(
      speakerImport,
      existingSpeakers,
    );
    expect(matched.existing).toBe(null);
  });

  test('Speaker import is matched by id', () => {
    const speakerImport: SpeakerImport = {
      id: 1,
      name: 'Speaker X',
      institution: 'Institution X',
      categories: ['open'],
    };
    const matched = matchSpeakerImportWithExistingSpeakers(
      speakerImport,
      existingSpeakers,
    );
    expect(matched.existing).not.toBe(null);
    expect(matched.existing?.id).toBe(1);
    expect(matched.existing && matched.matchedBy.id).toBe(true);
  });

  test('Speaker import is matched by name', () => {
    const speakerImport: SpeakerImport = {
      name: 'Speaker 1',
      institution: 'Institution X',
      categories: ['open'],
    };
    const matched = matchSpeakerImportWithExistingSpeakers(
      speakerImport,
      existingSpeakers,
    );
    expect(matched.existing).not.toBe(null);
    expect(matched.existing?.id).toBe(1);
    expect(matched.existing && matched.matchedBy.name).toBe(true);
  });

  test('Speaker import is matched by email', () => {
    const speakerImport: SpeakerImport = {
      name: 'Speaker X',
      institution: 'Institution X',
      email: 'speaker1@example.com',
      categories: ['open'],
    };
    const matched = matchSpeakerImportWithExistingSpeakers(
      speakerImport,
      existingSpeakers,
    );
    expect(matched.existing).not.toBe(null);
    expect(matched.existing?.id).toBe(1);
    expect(matched.existing && matched.matchedBy.email).toBe(true);
  });

  test('Null email does not match against existing speakers with null email', () => {
    const speakerImport: SpeakerImport = {
      name: 'Speaker X',
      institution: 'Institution X',
      email: null,
      categories: ['open'],
    };
    const matched = matchSpeakerImportWithExistingSpeakers(
      speakerImport,
      existingSpeakers,
    );
    expect(matched.existing).toBe(null);
  });

  test('Match prioritizes id over name and email', () => {
    const speakerImport: SpeakerImport = {
      id: 1,
      name: 'Speaker 2',
      institution: 'Institution X',
      email: 'speaker5@example.com',
      categories: ['open'],
    };
    const matched = matchSpeakerImportWithExistingSpeakers(
      speakerImport,
      existingSpeakers,
    );
    expect(matched.existing).not.toBe(null);
    if (matched.existing !== null) {
      expect(matched.existing.id).toBe(1);
      expect(matched.matchedBy.id).toBe(true);
      expect(matched.matchedBy.name).toBe(false);
      expect(matched.matchedBy.email).toBe(false);
    }
  });

  test('Match prioritizes name over email', () => {
    const speakerImport: SpeakerImport = {
      name: 'Speaker 2',
      institution: 'Institution X',
      email: 'speaker5@example.com',
      categories: ['open'],
    };
    const matched = matchSpeakerImportWithExistingSpeakers(
      speakerImport,
      existingSpeakers,
    );
    expect(matched.existing).not.toBe(null);
    if (matched.existing !== null) {
      expect(matched.existing.id).toBe(2);
      expect(matched.matchedBy.id).toBe(false);
      expect(matched.matchedBy.name).toBe(true);
      expect(matched.matchedBy.email).toBe(false);
    }
  });
});

describe(matchTeamImportWithExistingTeams, () => {
  const existingTeams: TeamDto[] = [
    {
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
    },
    {
      tournamentId: 'test_tournament',
      id: 2,
      reference: 'Team B',
      shortReference: 'Team B',
      institution: 2,
      institutionConflicts: [2],
      breakCategories: [1],
      emoji: '🌿',
      codeName: 'Grass',
      useInstitutionPrefix: false,
      shortName: 'Team B',
      longName: 'Team B',
      speakers: [
        {
          id: 3,
          name: 'Speaker B1',
          categories: [1],
          anonymous: false,
          email: 'speakerb1@example.com',
          institution: 2,
        },
        {
          id: 4,
          name: 'Speaker B2',
          categories: [1],
          anonymous: false,
          email: 'speakerb2@example.com',
          institution: 2,
        },
      ],
    },
    {
      tournamentId: 'test_tournament',
      id: 3,
      reference: 'Team C',
      shortReference: 'Team C',
      institution: null,
      institutionConflicts: [],
      breakCategories: [1, 2],
      emoji: '👻',
      codeName: 'Ghost',
      useInstitutionPrefix: false,
      shortName: 'Team C',
      longName: 'Team C',
      speakers: [
        {
          id: 5,
          name: 'Speaker C1',
          categories: [1, 2],
          anonymous: false,
          email: 'speakerc1@example.com',
          institution: 1,
        },
        {
          id: 6,
          name: 'Speaker C2',
          categories: [1, 2],
          anonymous: false,
          email: 'speakerc2@example.com',
          institution: 3,
        },
      ],
    },
    {
      tournamentId: 'test_tournament',
      id: 4,
      reference: '1',
      shortReference: '1',
      institution: 4,
      institutionConflicts: [4],
      breakCategories: [1],
      emoji: '⚓',
      codeName: 'Anchor',
      useInstitutionPrefix: true,
      shortName: 'Tokyo 1',
      longName: 'University of Tokyo 1',
      speakers: [
        {
          id: 7,
          name: 'Speaker D1',
          categories: [1, 2],
          anonymous: false,
          email: 'speakerd1@example.com',
          institution: 4,
        },
        {
          id: 8,
          name: 'Speaker D2',
          categories: [1],
          anonymous: false,
          email: 'speakerd2@example.com',
          institution: 4,
        },
      ],
    },
    {
      tournamentId: 'test_tournament',
      id: 5,
      reference: '1',
      shortReference: '1',
      institution: 5,
      institutionConflicts: [5],
      breakCategories: [1],
      emoji: '⛵',
      codeName: 'Yacht',
      useInstitutionPrefix: true,
      shortName: 'Kyoto 1',
      longName: 'Kyoto University 1',
      speakers: [
        {
          id: 9,
          name: 'Speaker E1',
          categories: [1, 2],
          anonymous: false,
          email: 'speakere1@example.com',
          institution: 5,
        },
        {
          id: 10,
          name: 'Speaker E2',
          categories: [1],
          anonymous: false,
          email: 'speakere2@example.com',
          institution: 5,
        },
      ],
    },
  ];

  test('Nothing is matched if id is provided but the id does not exist', () => {
    const teamImport: TeamImport = {
      id: 42,
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
    const matched = matchTeamImportWithExistingTeams(teamImport, existingTeams);
    expect(matched.existing).toBe(null);
  });

  test('Team import is matched by id', () => {
    const teamImport: TeamImport = {
      id: 1,
      reference: 'Team X',
      institution: 'Institution X',
      breakCategories: ['open'],
      speakers: [
        {
          name: 'Speaker X1',
          institution: 'Institution X',
          categories: ['open'],
          email: 'speakerx1@example.com',
        },
        {
          name: 'Speaker X2',
          institution: 'Institution X',
          categories: ['open'],
          email: 'speakerx2@example.com',
        },
      ],
    };
    const matched = matchTeamImportWithExistingTeams(teamImport, existingTeams);
    expect(matched.existing).not.toBe(null);
    if (matched.existing !== null) {
      expect(matched.existing.id).toBe(1);
      expect(matched.matchedBy.id).toBe(true);
    }
  });

  test('Team import is matched by reference', () => {
    const teamImport: TeamImport = {
      reference: 'Team A',
      institution: 'Institution X',
      breakCategories: ['open'],
      speakers: [
        {
          name: 'Speaker X1',
          institution: 'Institution X',
          categories: ['open'],
          email: 'speakerx1@example.com',
        },
        {
          name: 'Speaker X2',
          institution: 'Institution X',
          categories: ['open'],
          email: 'speakerx2@example.com',
        },
      ],
    };
    const matched = matchTeamImportWithExistingTeams(teamImport, existingTeams);
    expect(matched.existing).not.toBe(null);
    if (matched.existing !== null) {
      expect(matched.existing.id).toBe(1);
      expect(matched.matchedBy.reference).toBe(true);
    }
  });

  test.fails('Team import is matched by speakers', () => {
    const teamImport: TeamImport = {
      reference: 'Team X',
      institution: 'Institution X',
      breakCategories: ['open'],
      speakers: [
        {
          name: 'Speaker A1',
          institution: 'Institution X',
          categories: ['open'],
          email: 'speakera1@example.com',
        },
        {
          name: 'Speaker A2',
          institution: 'Institution X',
          categories: ['open'],
          email: 'speakera2@example.com',
        },
      ],
    };
    const matched = matchTeamImportWithExistingTeams(teamImport, existingTeams);
    expect(matched.existing).not.toBe(null);
    if (matched.existing !== null) {
      expect(matched.existing.id).toBe(1);
      expect(matched.matchedBy.reference).toBe(true);
    }
  });

  test('Match prioritizes id over reference', () => {
    const teamImport: TeamImport = {
      id: 1,
      reference: 'Team B',
      institution: 'Institution X',
      breakCategories: ['open'],
      speakers: [
        {
          name: 'Speaker X1',
          institution: 'Institution X',
          categories: ['open'],
          email: 'speakerx1@example.com',
        },
        {
          name: 'Speaker X2',
          institution: 'Institution X',
          categories: ['open'],
          email: 'speakerx2@example.com',
        },
      ],
    };
    const matched = matchTeamImportWithExistingTeams(teamImport, existingTeams);
    expect(matched.existing).not.toBe(null);
    if (matched.existing !== null) {
      expect(matched.existing.id).toBe(1);
      expect(matched.matchedBy.id).toBe(true);
      expect(matched.matchedBy.reference).toBe(false);
    }
  });

  test.fails('Match works with useInstitutionPrefix', () => {
    const teamImportTokyo: TeamImport = {
      reference: '1',
      institution: 'Tokyo',
      breakCategories: ['open'],
      useInstitutionPrefix: true,
      speakers: [],
    };
    const teamImportKyoto: TeamImport = {
      reference: '1',
      institution: 'Kyoto',
      breakCategories: ['open'],
      useInstitutionPrefix: true,
      speakers: [],
    };
    const matchedTokyo = matchTeamImportWithExistingTeams(
      teamImportTokyo,
      existingTeams,
    );
    const matchedKyoto = matchTeamImportWithExistingTeams(
      teamImportKyoto,
      existingTeams,
    );
    expect(matchedTokyo.existing).not.toBe(null);
    if (matchedTokyo.existing !== null) {
      expect(matchedTokyo.existing.id).toBe(4);
    }
    expect(matchedKyoto.existing).not.toBe(null);
    if (matchedKyoto.existing !== null) {
      expect(matchedKyoto.existing.id).toBe(5);
    }
  });
});
