import { ClassSerializerInterceptor, Module } from '@nestjs/common';
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

@Module({
  imports: [AuthModule.forRoot({ auth }), IdentityModule, SharedModule],
  controllers: [AppController, TournamentController, InstitutionController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    ActiveOrganizationGuard,
    TournamentGuard,
  ],
})
export class AppModule {}
