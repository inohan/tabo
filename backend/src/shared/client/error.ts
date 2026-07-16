import { ResponseError as ResponseErrorV1_3 } from 'tabbycat-client/out/v1.3.0';

interface ResponseError {
  response: Response;
}

export function isResponseError(obj: unknown): obj is ResponseError {
  return obj instanceof ResponseErrorV1_3;
}

export class TabbycatError extends Error {
  override name = 'TabbycatError';
  private __tabbycatError!: void;
  constructor(
    msg: string,
    public response?: Response,
  ) {
    super(
      response
        ? `[${response.url} ${response.status} ${response.statusText}] ${msg}`
        : msg,
    );
  }
}

export class TabbycatResponseError extends TabbycatError {
  override name = 'TabbycatResponseError';
  private __tabbycatResponseError!: void;

  constructor(
    msg: string,
    public override response: Response,
  ) {
    super(msg, response);
  }

  static async fromResponseError(error: ResponseError) {
    const message =
      error.response.headers.get('Content-Type') === 'application/json'
        ? await error.response.text()
        : '[Message truncated]';
    return new TabbycatResponseError(message, error.response);
  }
}

export class UrlParseError extends Error {
  override name = 'UrlParseError';
}
