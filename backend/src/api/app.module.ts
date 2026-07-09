import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@identity/infrastructure/persistence/auth';
import { OrganizationsController } from './organizations/organizations.controller';
import { TournamentController } from './tournament/tournament.controller';
import { IdentityModule } from './identity/identity.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [AuthModule.forRoot({ auth }), AuthModule, IdentityModule, SharedModule],
  controllers: [AppController, OrganizationsController, TournamentController],
  providers: [],
})
export class AppModule {}
