export class NestTournamentDto {
  id!: string;
  baseUrl!: string;
  tabbycatInfo!: NestTournamentTabbycatDto;
}

export class NestCreateTournamentDto {
  baseUrl!: string;
  token!: string;
  tournamentSlug!: string;
}

export class NestQueryTournamentCandidateDto {
  url!: string;
  token!: string;
  tournamentSlug?: string;
}

export class NestQueryTournamentCandidateResponseDto {
  baseUrl!: string;
  tournaments!: NestTournamentTabbycatDto[];
}

export class NestTournamentTabbycatDto {
  id!: number;
  slug!: string;
  name!: string;
  shortName!: string;
}
