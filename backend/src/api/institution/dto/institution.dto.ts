export class NestInstitutionDto {
  tournamentId!: string;

  id!: number;
  name!: string;
  code!: string;
}

export class NestCreateInstitutionDto {
  name!: string;
  code!: string;
}
