import { AuthError } from '@shared/domain';
import { err, ok, Result } from 'neverthrow';
import { IdentityAuth } from '@identity/infrastructure/persistence/auth';

export class GetProviderAccessTokenService {
  constructor(private auth: IdentityAuth) {}
  async execute({
    userId,
    providerId,
    requiredScopes,
  }: {
    userId: string;
    providerId: string;
    requiredScopes: string[];
  }): Promise<Result<string, AuthError>> {
    try {
      // refreshes automatically when within 5s of expiry
      const result = await this.auth.api.getAccessToken({
        body: { providerId, userId },
      });
      const missingScopes = [
        ...new Set(requiredScopes).difference(new Set(result.scopes)),
      ].sort();
      if (missingScopes.length > 0) {
        return err(
          new AuthError(`Missing scopes: ${missingScopes.join(', ')}`),
        );
      }
      return ok(result.accessToken);
    } catch (e) {
      return err(
        new AuthError(`No linked ${providerId} account`, { cause: e }),
      );
    }
  }
}
