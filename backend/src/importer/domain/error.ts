import { match } from 'ts-pattern';
import { TeamImportSessionFailedDetail } from './values';

export class TeamImportFailedError extends Error {
  override name = 'TeamImportFailedError';
  private __TeamImportFailedError!: void;
  declare cause: TeamImportSessionFailedDetail;

  constructor(cause: TeamImportSessionFailedDetail) {
    super(
      match(cause)
        .with(
          { type: 'missing-entities' },
          () => 'Error when creating missing entities',
        )
        .exhaustive(),
      { cause },
    );
  }
}

export class InvalidImportSessionStateError extends Error {
  override name = 'InvalidImportSessionStateError';
  private __InvalidImportSessionStateError!: void;
}
