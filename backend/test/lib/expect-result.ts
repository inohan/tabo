import { Err, Ok, Result } from 'neverthrow';

expect.extend({
  toBeOkResult(received: unknown) {
    if (received instanceof Err) {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('toBeOkResult', undefined, undefined) +
          '\n\n' +
          `Expected: ${this.utils.printExpected('Ok<...>')}\n` +
          `Received: ${this.utils.printReceived(`Err<${received._unsafeUnwrapErr()}>`)}`,
      };
    } else if (received instanceof Ok) {
      return {
        pass: true,
        message: () => `Expected: Ok`,
      };
    } else {
      throw new TypeError('Must be of type Result!');
    }
  },
  toBeErrResult(received: unknown) {
    if (received instanceof Ok) {
      return {
        pass: false,
        message: () =>
          this.utils.matcherHint('toBeErrResult', undefined, undefined) +
          '\n\n' +
          `Expected: ${this.utils.printExpected('Err<...>')}\n` +
          `Received: ${this.utils.printReceived(`Ok<${received._unsafeUnwrap()}>`)}`,
      };
    } else if (received instanceof Err) {
      return {
        pass: true,
        message: () => `Expected: Err`,
      };
    } else {
      throw new TypeError('Must be of type Result!');
    }
  },
});

export const expectOkResult = <T>(result: Result<T, unknown>): T => {
  // @ts-expect-error expect registration
  expect(result).toBeOkResult();
  return result._unsafeUnwrap();
};

export const expectErrResult = <E extends Error>(
  result: Result<unknown, E>,
  errorInstance?: new (...args: never[]) => Error,
): E => {
  // @ts-expect-error expect registration
  expect(result).toBeErrResult();
  const unwrapped = result._unsafeUnwrapErr();
  if (errorInstance) {
    expect(unwrapped).toBeInstanceOf(errorInstance);
  }
  return unwrapped;
};
