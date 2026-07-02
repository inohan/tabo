import { Result } from 'neverthrow';

export class TransactionError extends Error {}

export interface UnitOfWork {
  run<T, E>(work: () => Result<T, E>): Result<T, E | TransactionError>;
}
