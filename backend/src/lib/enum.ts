import { brand, Branded } from './brand';

export const Enum = <
  T extends readonly { readonly type: string }[],
  Brand extends symbol,
>(
  choices: T,
) => {
  const obj = Object.fromEntries(choices.map((v) => [v.type, v])) as {
    [E in T[number] as E['type']]: E;
  };
  const mapped = new Map(choices.map((v) => [v.type, v]));
  const enum_ = {
    ...obj,
    _find: <K extends T[number]['type']>(type: K) => {
      const value = mapped.get(type);
      if (value === undefined) {
        throw new Error(`Invalid type ${type}`);
      }
      return brand<Brand>()(value) as K extends T[number]['type']
        ? Branded<Extract<T[number], { type: K }>, Brand>
        : never;
    },
    _of: <K extends string>(
      type: K,
    ): string extends K
      ? { [E in keyof T]: Branded<T[E], Brand> }[number] | undefined
      : K extends T[number]['type']
        ? Branded<Extract<T[number], { type: K }>, Brand>
        : undefined => {
      const value = mapped.get(type) as T[number] | undefined;
      // @ts-expect-error Too lazy
      return value ?? brand<Brand>()(value);
    },
    _keys: choices.map((c) => c.type) as { [K in keyof T]: T[K]['type'] },
  };

  return enum_ as typeof enum_ & {
    __metadata: { __choices: T; __brand: Brand };
  };
};

export type Enum<
  T extends readonly { readonly type: string }[],
  Brand extends symbol,
> = { [E in keyof T]: Branded<T[E], Brand> }[number];
