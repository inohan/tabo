import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@identity/infrastructure/persistence/auth';
import { TournamentController } from './tournament/tournament.controller';
import { IdentityModule } from './identity/identity.module';
import { SharedModule } from './shared/shared.module';
import { ActiveOrganizationGuard } from './organization/active-organization.guard';
import { TournamentGuard } from './tournament/tournament.guard';
import { InstitutionController } from './institution/institution.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TeamImportController } from './importer/team/team.controller';
import { AdjudicatorController } from './importer/adjudicator/adjudicator.controller';
import { ImporterModule } from './importer/importer.module';
import { ValibotSerializerInterceptor } from './lib/valibot';

@Module({
  imports: [
    AuthModule.forRoot({ auth }),
    IdentityModule,
    SharedModule,
    ImporterModule,
  ],
  controllers: [
    AppController,
    TournamentController,
    InstitutionController,
    TeamImportController,
    AdjudicatorController,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ValibotSerializerInterceptor },
    ActiveOrganizationGuard,
    TournamentGuard,
  ],
})
export class AppModule {}
