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

@Module({
  imports: [AuthModule.forRoot({ auth }), IdentityModule, SharedModule],
  controllers: [AppController, TournamentController, InstitutionController],
  providers: [ActiveOrganizationGuard, TournamentGuard],
})
export class AppModule {}
