import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { TournamentAuth } from '../tournament/tournament.guard';
import {
  CreateFileService,
  GenerateFileUploadUrlService,
  GetFileService,
} from '@shared/service';
import { ApiValibotResponse } from '../lib/valibot';
import { NotFoundError, SaveFailedError, TournamentId } from '@shared/domain';
import { ok, safeTry } from 'neverthrow';
import { match, P } from 'ts-pattern';
import { throwHttpError } from '../lib/throw-http-error';
import { NestUploadUrlDto } from './dto/file';

@TournamentAuth()
@Controller('files')
export class FileController {
  constructor(
    private createFileService: CreateFileService,
    private getFileService: GetFileService,
    private generateFileUploadUrlService: GenerateFileUploadUrlService,
  ) {}

  @ApiValibotResponse(NestUploadUrlDto)
  @Post('upload')
  async createAndIssueUploadUrl(
    @Param('tournamentId') tournamentId: TournamentId,
  ) {
    return safeTry(
      async function* (this: FileController) {
        const fileId = yield* await this.createFileService.execute({
          tournamentId,
        });
        const uploadUrl =
          yield* await this.generateFileUploadUrlService.execute({
            tournamentId,
            fileId,
          });
        return ok({
          id: fileId,
          url: uploadUrl,
        });
      }.bind(this),
    ).match(
      (t) => t,
      (e) =>
        match(e)
          .with(P.instanceOf(NotFoundError), throwHttpError(NotFoundException))
          .with(
            P.instanceOf(SaveFailedError),
            throwHttpError(InternalServerErrorException),
          )
          .exhaustive(),
    );
  }
}
