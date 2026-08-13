import { Result } from 'neverthrow';
import { throw_ } from 'src/lib/throw';
import * as v from 'valibot';
export class NotFoundError extends Error {
  override name = 'NotFoundError';
  private __notFoundError!: void;
}

export class SaveFailedError extends Error {
  override name = 'SaveFailedError';
  private __saveFailedError!: void;
}

export class PartialFailedError<T = unknown, E = Error> extends Error {
  override name = 'PartialFailedError';
  private __partialFailedError!: void;
  declare cause: Result<T, E>[];

  constructor(results: Result<T, E>[]) {
    const errorCount = results.filter((result) => result.isErr()).length;
    if (errorCount === 0) {
      throw_(new Error());
    }
    super(`${errorCount} out of ${results.length} failed.`, { cause: results });
  }
}

export class AuthError extends Error {
  override name = 'AuthError';
  private __authError!: void;
}

export class ParseFailedError<
  TBase extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>> =
    v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
> extends Error {
  private __parseFailedError!: void;
  override name = 'ParseFailedError';
  declare cause: v.FlatErrors<TBase>;

  static fromIssue<
    TSchema extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
  >(rawIssue: readonly [v.InferIssue<TSchema>, ...v.InferIssue<TSchema>[]]) {
    const flat = v.flatten<TSchema>(rawIssue);
    return new ParseFailedError<TSchema>(JSON.stringify(flat), {
      cause: flat,
    });
  }
}
