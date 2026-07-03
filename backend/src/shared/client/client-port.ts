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
import { ResultAsync } from 'neverthrow';
import { PickUnbranded, PickBranded } from 'src/lib/brand';
import { TabbycatError } from './error';

type TabbycatResult<T> = ResultAsync<T, TabbycatError>;

export type ClientFactoryPort = (config: {
  baseUrl: string;
  token: string;
  tournamentSlug: string;
}) => ClientPort;
export interface ClientPort {
  tournaments: {
    get: () => TabbycatResult<out.TournamentDTO>;
  };
  institutions: {
    get: (institutionId: InstitutionId) => TabbycatResult<out.InstitutionDTO>;
    list: () => TabbycatResult<out.InstitutionDTO[]>;
    create: (
      institution: PickUnbranded<Institution, 'name' | 'code'>,
    ) => TabbycatResult<out.InstitutionDTO>;
    update: (
      institution: PickBranded<Institution>,
    ) => TabbycatResult<out.InstitutionDTO>;
    delete: (institutionId: InstitutionId) => TabbycatResult<void>;
  };
  teams: {
    get: (teamId: TeamId) => TabbycatResult<out.TeamDTO>;
    list: () => TabbycatResult<out.TeamDTO[]>;
    create: (
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
    update: (team: PickBranded<Team>) => TabbycatResult<out.TeamDTO>;
    delete: (teamId: TeamId) => TabbycatResult<void>;
  };
  speakers: {
    get: (speakerId: SpeakerId) => TabbycatResult<out.SpeakerDTO>;
    list: () => TabbycatResult<out.SpeakerDTO[]>;
    create: (
      speaker: PickUnbranded<
        Speaker,
        'name' | 'teamId' | 'categories',
        'institutionId'
      >,
    ) => TabbycatResult<out.SpeakerDTO>;
    update: (speaker: PickBranded<Speaker>) => TabbycatResult<out.SpeakerDTO>;
    delete: (speakerId: SpeakerId) => TabbycatResult<void>;
  };
  venues: {
    get: (venueId: VenueId) => TabbycatResult<out.VenueDTO>;
    list: () => TabbycatResult<out.VenueDTO[]>;
    // create: (venue: PickUnbranded<Venue, "">) => TabbycatResult<OmitUnbranded<Venue>>;
    // update: (venue: PickBranded<Venue>) => TabbycatResult<OmitUnbranded<Venue>>;
    // delete: (venueId: VenueId) => TabbycatResult<void>;
  };
  breakCategories: {
    get: (
      breakCategoryId: BreakCategoryId,
    ) => TabbycatResult<out.BreakCategoryDTO>;
    list: () => TabbycatResult<out.BreakCategoryDTO[]>;
    create: (
      breakCategory: PickUnbranded<
        BreakCategory,
        'name' | 'slug' | 'seq' | 'breakSize' | 'isGeneral' | 'priority'
      >,
    ) => TabbycatResult<out.BreakCategoryDTO>;
    update: (
      breakCategory: PickBranded<BreakCategory>,
    ) => TabbycatResult<out.BreakCategoryDTO>;
    delete: (breakCategoryId: BreakCategoryId) => TabbycatResult<void>;
  };
  speakerCategories: {
    get: (
      speakerCategoryId: SpeakerCategoryId,
    ) => TabbycatResult<out.SpeakerCategoryDTO>;
    list: () => TabbycatResult<out.SpeakerCategoryDTO[]>;
    create: (
      speakerCategory: PickUnbranded<SpeakerCategory, 'name' | 'slug' | 'seq'>,
    ) => TabbycatResult<out.SpeakerCategoryDTO>;
    update: (
      speakerCategory: PickBranded<SpeakerCategory>,
    ) => TabbycatResult<out.SpeakerCategoryDTO>;
    delete: (speakerCategoryId: SpeakerCategoryId) => TabbycatResult<void>;
  };
  adjudicators: {
    get: (adjudicatorId: AdjudicatorId) => TabbycatResult<out.AdjudicatorDTO>;
    list: () => TabbycatResult<out.AdjudicatorDTO[]>;
    create: (
      adjudicator: PickUnbranded<Adjudicator, 'name' | 'institutionId'>,
    ) => TabbycatResult<out.AdjudicatorDTO>;
    update: (
      adjudicator: PickBranded<Adjudicator>,
    ) => TabbycatResult<out.AdjudicatorDTO>;
    delete: (adjudicatorId: AdjudicatorId) => TabbycatResult<void>;
  };
}
