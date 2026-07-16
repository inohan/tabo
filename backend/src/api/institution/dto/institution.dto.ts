export class NestInstitutionDto {
  tournamentId!: string;
  tabbycatInfo!: NestInstitutionTabbycatDto;
}

export class NestInstitutionTabbycatDto {
  id!: number;
  name!: string;
  code!: string;
}

export class NestCreateInstitutionDto {
  name!: string;
  code!: string;
}
