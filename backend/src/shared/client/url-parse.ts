import { compile, match } from 'path-to-regexp';
import { UrlParseError } from './error';

type _HandlePathSegment<T extends string> = T extends `:${infer ParamName}`
  ? { [K in ParamName]: string }
  : T extends `*${infer ParamName}`
    ? { [K in ParamName]: string[] }
    : unknown;

type _SplitMatcher<T extends string> = T extends `/${infer A}{${infer Rest}`
  ? _SplitMatcher<`/${A}`> & _SplitMatcher<`{${Rest}`>
  : T extends `/${infer A}/${infer Rest}`
    ? _HandlePathSegment<A> & _SplitMatcher<`/${Rest}`>
    : T extends `{/${infer A}}${infer Rest}`
      ? (_SplitMatcher<`/${A}`> extends object
          ? Partial<_SplitMatcher<`/${A}`>>
          : unknown) &
          _SplitMatcher<Rest>
      : T extends `/${infer A}`
        ? _HandlePathSegment<A>
        : T extends ''
          ? unknown
          : T;

type SplitMatcher<T extends string> =
  _SplitMatcher<T> extends object ? _SplitMatcher<T> : object;

type Stringable = string | number | bigint | undefined | boolean | null;

type _HandleCompilePathSegment<T extends string> =
  T extends `:${infer ParamName}`
    ? {
        [K in ParamName]: Stringable;
      }
    : T extends `*${infer ParamName}`
      ? {
          [K in ParamName]: Stringable[];
        }
      : unknown;

type CompileParams<T extends string> = T extends `/${infer A}/${infer Rest}`
  ? _HandleCompilePathSegment<A> & CompileParams<`/${Rest}`>
  : T extends `/${infer A}`
    ? _HandleCompilePathSegment<A>
    : T extends ''
      ? object
      : never;

type Join<
  T extends Stringable[],
  Delim extends Stringable = ' ',
> = Stringable[] extends T
  ? string
  : T extends [
        infer A extends Stringable,
        infer B extends Stringable,
        ...infer Rest extends Stringable[],
      ]
    ? `${A}${Delim}${Join<[B, ...Rest], Delim>}`
    : T extends [infer A extends Stringable, ...Stringable[]]
      ? `${A}`
      : ``;

type _HandleCompileSegment<
  A extends string,
  U extends object,
> = A extends `:${infer Param}`
  ? Param extends keyof U
    ? U[Param] extends Stringable
      ? U[Param]
      : never
    : never
  : A extends `*${infer Param}`
    ? Param extends keyof U
      ? U[Param] extends Stringable[]
        ? Join<U[Param], '/'>
        : never
      : never
    : A;

type _CompiledString<
  T extends string,
  U extends object,
> = T extends `/${infer A}/${infer Rest}`
  ? `/${_HandleCompileSegment<A, U>}${_CompiledString<`/${Rest}`, U>}`
  : T extends `/${infer A}`
    ? `/${_HandleCompileSegment<A, U>}`
    : T;

type CompiledString<
  T extends string,
  U extends CompileParams<T>,
> = U extends object ? _CompiledString<T, U> : never;

// type foo = CompiledString<'/api/v1/institutions/:id', { id: 2 }>;

export const matchOrRaise = <T extends string>(
  url: string,
  matcher: T,
): SplitMatcher<T> => {
  const path = new URL(url).pathname;
  const fn = match(matcher);
  const res = fn(path);
  if (res === false) {
    throw new UrlParseError(`Failed to parse ${url} into ${matcher}`);
  }
  return res.params as SplitMatcher<T>;
};

export const matchOrUndefined = <T extends string>(
  url: string,
  matcher: T,
): SplitMatcher<T> | undefined => {
  const path = new URL(url).pathname;
  const fn = match(matcher);
  const res = fn(path);
  if (res === false) {
    return undefined;
  }
  return res.params as SplitMatcher<T>;
};

export const compileUrl = <T extends string, U extends CompileParams<T>>(
  matcher: T,
  params: U,
): CompiledString<T, U> => {
  const toPath = compile(matcher);
  return toPath(
    params as Partial<Record<string, string | string[]>>,
  ) as CompiledString<T, U>;
};
