import {
  Institution,
  InstitutionId,
  Team,
  TeamId,
  Speaker,
  SpeakerId,
  VenueId,
  BreakCategory,
  BreakCategoryId,
  SpeakerCategory,
  SpeakerCategoryId,
  Adjudicator,
  AdjudicatorId,
} from '../domain';
import * as out from './output-dto';
import { Result } from 'neverthrow';
import { PickUnbranded, PickBranded } from 'src/lib/brand';
import { TabbycatError } from './error';

type TabbycatResult<T> = Promise<Result<T, TabbycatError>>;

export type ClientFactoryPort = (config: {
  baseUrl: string;
  token: string;
  tournamentSlug: string;
}) => ClientPort;
export interface ClientPort {
  getTournament: () => TabbycatResult<out.TournamentDTO>;
  listTournaments: () => TabbycatResult<out.TournamentDTO[]>;

  getInstitution: (
    institutionId: InstitutionId,
  ) => TabbycatResult<out.InstitutionDTO>;
  listInstitutions: () => TabbycatResult<out.InstitutionDTO[]>;
  createInstitution: (
    institution: PickUnbranded<Institution, 'name' | 'code'>,
  ) => TabbycatResult<out.InstitutionDTO>;
  updateInstitution: (
    institution: PickBranded<Institution>,
  ) => TabbycatResult<out.InstitutionDTO>;
  deleteInstitution: (institutionId: InstitutionId) => TabbycatResult<void>;

  getTeam: (teamId: TeamId) => TabbycatResult<out.TeamDTO>;
  listTeams: () => TabbycatResult<out.TeamDTO[]>;
  createTeam: (
    team: PickUnbranded<
      Team,
      'reference' | 'breakCategories' | 'institutionId'
    > & {
      speakers: PickUnbranded<
        Speaker,
        'name' | 'categories',
        'institutionId' | 'teamId'
      >[];
    },
  ) => TabbycatResult<out.TeamDTO>;
  updateTeam: (team: PickBranded<Team>) => TabbycatResult<out.TeamDTO>;
  deleteTeam: (teamId: TeamId) => TabbycatResult<void>;

  getSpeaker: (speakerId: SpeakerId) => TabbycatResult<out.SpeakerDTO>;
  listSpeakers: () => TabbycatResult<out.SpeakerDTO[]>;
  createSpeaker: (
    speaker: PickUnbranded<
      Speaker,
      'name' | 'teamId' | 'categories',
      'institutionId'
    >,
  ) => TabbycatResult<out.SpeakerDTO>;
  updateSpeaker: (
    speaker: PickBranded<Speaker>,
  ) => TabbycatResult<out.SpeakerDTO>;
  deleteSpeaker: (speakerId: SpeakerId) => TabbycatResult<void>;

  getVenue: (venueId: VenueId) => TabbycatResult<out.VenueDTO>;
  listVenues: () => TabbycatResult<out.VenueDTO[]>;
  // createVenue: (venue: PickUnbranded<Venue, "">) => TabbycatResult<OmitUnbranded<Venue>>;
  // updateVenue: (venue: PickBranded<Venue>) => TabbycatResult<OmitUnbranded<Venue>>;
  // deleteVenue: (venueId: VenueId) => TabbycatResult<void>;

  getBreakCategory: (
    breakCategoryId: BreakCategoryId,
  ) => TabbycatResult<out.BreakCategoryDTO>;
  listBreakCategories: () => TabbycatResult<out.BreakCategoryDTO[]>;
  createBreakCategory: (
    breakCategory: PickUnbranded<
      BreakCategory,
      'name' | 'slug' | 'seq' | 'breakSize' | 'isGeneral' | 'priority'
    >,
  ) => TabbycatResult<out.BreakCategoryDTO>;
  updateBreakCategory: (
    breakCategory: PickBranded<BreakCategory>,
  ) => TabbycatResult<out.BreakCategoryDTO>;
  deleteBreakCategory: (
    breakCategoryId: BreakCategoryId,
  ) => TabbycatResult<void>;

  getSpeakerCategory: (
    speakerCategoryId: SpeakerCategoryId,
  ) => TabbycatResult<out.SpeakerCategoryDTO>;
  listSpeakerCategories: () => TabbycatResult<out.SpeakerCategoryDTO[]>;
  createSpeakerCategory: (
    speakerCategory: PickUnbranded<SpeakerCategory, 'name' | 'slug' | 'seq'>,
  ) => TabbycatResult<out.SpeakerCategoryDTO>;
  updateSpeakerCategory: (
    speakerCategory: PickBranded<SpeakerCategory>,
  ) => TabbycatResult<out.SpeakerCategoryDTO>;
  deleteSpeakerCategory: (
    speakerCategoryId: SpeakerCategoryId,
  ) => TabbycatResult<void>;

  getAdjudicator: (
    adjudicatorId: AdjudicatorId,
  ) => TabbycatResult<out.AdjudicatorDTO>;
  listAdjudicator: () => TabbycatResult<out.AdjudicatorDTO[]>;
  createAdjudicator: (
    adjudicator: PickUnbranded<Adjudicator, 'name' | 'institutionId'>,
  ) => TabbycatResult<out.AdjudicatorDTO>;
  updateAdjudicator: (
    adjudicator: PickBranded<Adjudicator>,
  ) => TabbycatResult<out.AdjudicatorDTO>;
  deleteAdjudicator: (adjudicatorId: AdjudicatorId) => TabbycatResult<void>;

  me: () => TabbycatResult<void>;
}
