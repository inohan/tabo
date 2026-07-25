import { Speaker, Team, TeamId, TournamentId } from '@shared/domain';
import { Branded, PickUnbranded } from 'src/lib/brand';

declare const importSessionSymbol: unique symbol;
declare const importTeamRowSymbol: unique symbol;

export type ImportTeamRow = Branded<
  {
    raw: unknown;
    parsedTeam:
      | (PickUnbranded<
          Team,
          'reference' | 'institutionId' | 'breakCategories'
        > & {
          speakers: PickUnbranded<
            Speaker,
            'name' | 'categories',
            'teamId' | 'institutionId'
          >[];
        })
      | undefined;
    classification: 'existing' | 'update' | 'new' | 'invalid';
  },
  typeof importRowSymbol
>;

export type ImportSession = Branded<
  {
    tournamentId: TournamentId;
    type: 'team' | 'adjudicator';
    headers: string[];
    headerMappings: Record<string, string>;
    createdAt: Date;
  },
  typeof importSessionSymbol
>;
