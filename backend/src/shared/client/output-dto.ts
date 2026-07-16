import { OmitUnbranded } from 'src/lib/brand';
import * as m from '../domain';

export type TournamentDTO = OmitUnbranded<
  m.Tournament,
  'tournamentId' | 'token' | 'baseUrl'
>;
export type InstitutionDTO = OmitUnbranded<m.Institution, 'tournamentId'>;
export type TeamDTO = OmitUnbranded<m.Team, 'tournamentId' | 'speakers'> & {
  speakers: OmitUnbranded<
    m.Speaker,
    'tournamentId' | 'institutionId' | 'teamId'
  >[];
};
export type SpeakerDTO = OmitUnbranded<
  m.Speaker,
  'tournamentId' | 'institutionId'
>;
export type VenueDTO = OmitUnbranded<m.Venue, 'tournamentId'>;
export type BreakCategoryDTO = OmitUnbranded<m.BreakCategory, 'tournamentId'>;
export type SpeakerCategoryDTO = OmitUnbranded<
  m.SpeakerCategory,
  'tournamentId'
>;
export type AdjudicatorDTO = OmitUnbranded<m.Adjudicator, 'tournamentId'>;
export type RoundDTO = OmitUnbranded<m.Round, 'tournamentId'>;
