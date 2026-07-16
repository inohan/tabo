export class NotFoundError extends Error {
  override name = 'NotFoundError';
  private __notFoundError!: void;
}

export class SaveFailedError extends Error {
  override name = 'SaveFailedError';
  private __saveFailedError!: void;
}
