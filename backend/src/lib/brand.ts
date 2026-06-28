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

export const Struct = <TBranded extends Branded<unknown, symbol>>() => ({
  init: (params: Unbranded<TBranded>) => params as TBranded,
  plain: (branded: TBranded) => branded as Unbranded<TBranded>,
});
