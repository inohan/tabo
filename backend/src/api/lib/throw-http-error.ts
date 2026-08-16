import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

type AcceptableErrors =
  | typeof NotFoundException
  | typeof BadRequestException
  | typeof UnauthorizedException;

/**
 * Converter to throw **returned** error types as one of HTTP exceptions
 * @param errorType The Nest HTTP Exception subclass to throw.
 * @returns
 */
export const throwHttpError = (errorType: AcceptableErrors) => {
  return (e: Error) => {
    throw new errorType(e.message, { cause: e });
  };
};
