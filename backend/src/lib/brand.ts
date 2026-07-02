import { MutableKeys } from './mutable-keys';

export declare class Brand<TName extends symbol> {
  protected readonly __brand: { [K in TName]: unknown };
}

export type Branded<TBase, TName extends symbol> = TBase & Brand<TName>;

export const brand =
  <TName extends symbol>() =>
  <TBase>(value: TBase): Branded<TBase, TName> =>
    value as Branded<TBase, TName>;

type RemoveAllBrands<T> =
  T extends Brand<infer TName>
    ? {
        [K in TName]: T extends Branded<infer TBase, K>
          ? RemoveAllBrands<TBase>
          : never;
      }[TName]
    : T;

export type Unbranded<T> = RemoveAllBrands<T>;

export type OmitUnbranded<
  T extends Branded<object, symbol>,
  OmittedKeys extends keyof Unbranded<T>,
> = Omit<Unbranded<T>, OmittedKeys>;

export const Struct = <TBranded extends Branded<unknown, symbol>>() => ({
  init: (params: Unbranded<TBranded>) => params as TBranded,
  plain: (branded: TBranded) => branded as Unbranded<TBranded>,
});

export type PickUnbranded<
  T extends Branded<object, symbol>,
  RequiredKeys extends MutableKeys<Unbranded<T>>,
  ExcludedMutableKeys extends Exclude<MutableKeys<Unbranded<T>>, RequiredKeys> =
    never,
> = Pick<Unbranded<T>, RequiredKeys> &
  Partial<
    Pick<
      Unbranded<T>,
      Exclude<MutableKeys<Unbranded<T>>, RequiredKeys | ExcludedMutableKeys>
    >
  >;

export type PickBranded<
  T extends Branded<object, symbol>,
  // @ts-expect-error Exclude all readonly keys except for id
  Immutables extends ImmutableKeys<Unbranded<T>> = 'id',
> = Pick<Unbranded<T>, MutableKeys<Unbranded<T>> | Immutables> &
  (T extends Brand<infer S> ? Brand<S> : never);
