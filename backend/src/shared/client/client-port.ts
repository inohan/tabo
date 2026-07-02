import {
  Tournament,
  Institution,
  InstitutionId,
  Team,
  TeamId,
  Speaker,
  SpeakerId,
  Venue,
  VenueId,
  BreakCategory,
  BreakCategoryId,
  SpeakerCategory,
  SpeakerCategoryId,
} from '../domain';
import { ResultAsync } from 'neverthrow';
import { Branded, Unbranded, Brand } from 'src/lib/brand';
import { ImmutableKeys, MutableKeys } from 'src/lib/mutable-keys';
import { TabbycatError } from './error';

type TabbycatResult<T> = ResultAsync<T, TabbycatError>;

type PickUnbranded<
  T extends Branded<object, symbol>,
  RequiredKeys extends MutableKeys<Unbranded<T>>,
  ExcludedMutableKeys extends Exclude<MutableKeys<Unbranded<T>>, RequiredKeys> =
    never,
> = Pick<Unbranded<T>, RequiredKeys> &
  Partial<
    Pick<
      Unbranded<T>,
      Exclude<MutableKeys<Unbranded<T>>, RequiredKeys | ExcludedMutableKeys>
    >
  >;

type PickBranded<
  T extends Branded<object, symbol>,
  Immutables extends ImmutableKeys<Unbranded<T>> = 'id',
> = Pick<Unbranded<T>, MutableKeys<Unbranded<T>> | Immutables> &
  (T extends Brand<infer S> ? Brand<S> : never);

export interface ClientPort {
  tournaments: {
    get: () => TabbycatResult<Tournament>;
  };
  institutions: {
    get: (institutionId: InstitutionId) => TabbycatResult<Institution>;
    list: () => TabbycatResult<Institution[]>;
    create: (
      institution: PickUnbranded<Institution, 'name' | 'code'>,
    ) => TabbycatResult<Institution>;
    update: (
      institution: PickBranded<Institution>,
    ) => TabbycatResult<Institution>;
    delete: (institutionId: InstitutionId) => TabbycatResult<void>;
  };
  teams: {
    get: (teamId: TeamId) => TabbycatResult<Team>;
    list: () => TabbycatResult<Team[]>;
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
    ) => TabbycatResult<Team>;
    update: (team: PickBranded<Team>) => TabbycatResult<Team>;
    delete: (teamId: TeamId) => TabbycatResult<void>;
  };
  speakers: {
    get: (speakerId: SpeakerId) => TabbycatResult<Speaker>;
    list: () => TabbycatResult<Speaker[]>;
    create: (
      speaker: PickUnbranded<
        Speaker,
        'name' | 'teamId' | 'categories',
        'institutionId'
      >,
    ) => TabbycatResult<Speaker>;
    update: (speaker: PickBranded<Speaker>) => TabbycatResult<Speaker>;
    delete: (speakerId: SpeakerId) => TabbycatResult<void>;
  };
  venues: {
    get: (venueId: VenueId) => TabbycatResult<Venue>;
    list: () => TabbycatResult<Venue[]>;
    // create: (venue: PickUnbranded<Venue, "">) => TabbycatResult<Venue>;
    // update: (venue: PickBranded<Venue>) => TabbycatResult<Venue>;
    // delete: (venueId: VenueId) => TabbycatResult<void>;
  };
  breakCategories: {
    get: (breakCategoryId: BreakCategoryId) => TabbycatResult<BreakCategory>;
    list: () => TabbycatResult<BreakCategory[]>;
    create: (
      breakCategory: PickUnbranded<
        BreakCategory,
        'name' | 'slug' | 'seq' | 'breakSize' | 'isGeneral' | 'priority'
      >,
    ) => TabbycatResult<BreakCategory>;
    update: (
      breakCategory: PickBranded<BreakCategory>,
    ) => TabbycatResult<BreakCategory>;
    delete: (breakCategoryId: BreakCategoryId) => TabbycatResult<void>;
  };
  speakerCategories: {
    get: (
      speakerCategoryId: SpeakerCategoryId,
    ) => TabbycatResult<SpeakerCategory>;
    list: () => TabbycatResult<SpeakerCategory[]>;
    create: (
      speakerCategory: PickUnbranded<SpeakerCategory, 'name' | 'slug' | 'seq'>,
    ) => TabbycatResult<SpeakerCategory>;
    update: (
      speakerCategory: PickBranded<SpeakerCategory>,
    ) => TabbycatResult<SpeakerCategory>;
    delete: (speakerCategoryId: SpeakerCategoryId) => TabbycatResult<void>;
  };
}
