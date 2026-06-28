interface ResponseError {
  response: {
    status: number;
    text: () => Promise<string>;
  };
}

export function isResponseError(obj: unknown): obj is ResponseError {
  return (
    typeof obj == 'object' &&
    obj instanceof Error &&
    obj.name == 'ResponseError'
  );
}

export class TabbycatError extends Error {
  constructor(
    public statusCode: number | undefined,
    public details: string,
  ) {
    super(`${statusCode ?? 'unknown error'}: ${details}`);
  }

  static async fromResponseError(error: ResponseError): Promise<TabbycatError> {
    return new TabbycatError(
      error.response.status,
      await error.response.text(),
    );
  }
}

export class UrlParseError extends Error {}
