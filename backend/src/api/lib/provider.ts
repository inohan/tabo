import { InjectionToken } from '@nestjs/common';

type Class = new (...args: never[]) => unknown;
type AbstractClass = abstract new (...args: never[]) => unknown;

type Func = (...args: never[]) => unknown;
type ProviderSymbol = string | symbol | Class | AbstractClass | Func;
type SimpleProvider = {
  provide: ProviderSymbol;
  return: unknown;
};
type ExtendedProvider<P extends ProviderSymbol = ProviderSymbol> =
  | {
      readonly provide: P;
      readonly useValue: unknown;
    }
  | {
      readonly provide: P;
      readonly useFactory: (...args: never[]) => unknown;
      readonly inject?: InjectionToken[];
    };
type Simplify<P extends ExtendedProvider> = P extends { provide: AbstractClass }
  ? { provide: P['provide']; return: InstanceType<P['provide']> }
  : P extends { useValue: unknown }
    ? { provide: P['provide']; return: P['useValue'] }
    : P extends { useFactory: (...args: never[]) => unknown }
      ? { provide: P['provide']; return: ReturnType<P['useFactory']> }
      : never;

type MapInjection<
  P extends SimpleProvider[],
  Inject extends readonly P[number]['provide'][],
> = {
  -readonly [K in keyof Inject]: Extract<
    P[number],
    { provide: Inject[K] }
  >['return'];
};

type Filter<
  T extends SimpleProvider[],
  FilterSymbols extends ProviderSymbol,
> = T extends [
  infer F extends SimpleProvider,
  ...infer Rest extends SimpleProvider[],
]
  ? F['provide'] extends FilterSymbols
    ? [F, ...Filter<Rest, FilterSymbols>]
    : Filter<Rest, FilterSymbols>
  : [];

export interface ProviderBuilder<
  T extends SimpleProvider[],
  D extends SimpleProvider[],
> {
  dependsOn: <E extends SimpleProvider[]>(
    providerBuilder: ProviderBuilder<E, SimpleProvider[]>,
  ) => ProviderBuilder<T, [...D, ...E]>;

  provide: <PS extends ProviderSymbol, P extends ExtendedProvider<PS>>(
    provider: P,
  ) => ProviderBuilder<[...T, Simplify<P>], D>;

  /**
   * Adds a class provider
   * @param cls concrete class
   * @param injectProviders injections to be made. Note that the injection errors are detected using structural typing; therefore, a class with constructor (cls1, cls2) will not throw type error if the shape of cls1 and cls2 are identical.
   * @returns Class builder
   */
  provideClass: <
    U extends
      | readonly []
      | readonly [
          [...D, ...T][number]['provide'],
          ...[...D, ...T][number]['provide'][],
        ],
    Cls extends new (...args: MapInjection<[...D, ...T], U>) => unknown,
  >(
    cls: Cls,
    injectProviders: U,
  ) => ProviderBuilder<
    [
      ...T,
      {
        provide: Cls;
        return: InstanceType<Cls>;
      },
    ],
    D
  >;

  provideAbstractClass: <
    A extends AbstractClass,
    U extends
      | readonly []
      | readonly [
          [...D, ...T][number]['provide'],
          ...[...D, ...T][number]['provide'][],
        ],
    Cls extends new (...args: MapInjection<[...D, ...T], U>) => InstanceType<A>,
  >(
    abstract: A,
    concrete: Cls,
    injectProviders: U,
  ) => ProviderBuilder<[...T, { provide: A; return: InstanceType<Cls> }], D>;
  pick: <
    S extends
      | readonly []
      | readonly [T[number]['provide'], ...T[number]['provide'][]],
  >(
    symbols: S,
  ) => ProviderBuilder<Filter<T, S[number]>, D>;
  compile: () => { [K in keyof T]: ExtendedProvider<T[K]['provide']> };
}

const build = (providers: ExtendedProvider[]) => ({
  compile: () => {
    const symbolsSet = new Set<ProviderSymbol>();
    providers.forEach((prov) => {
      if (symbolsSet.has(prov.provide)) {
        throw new Error('Duplicate identities exist in the provider builder.');
      }
      symbolsSet.add(prov.provide);
    });
    return providers;
  },
  pick: (symbols: unknown[]) => {
    const symbolsSet = new Set(symbols);
    return build(providers.filter((prov) => symbolsSet.has(prov.provide)));
  },
  dependsOn: () => build(providers),
  provide(provider: ExtendedProvider) {
    return build([...providers, provider]);
  },
  provideClass(
    cls: new (...args: never[]) => unknown,
    injectProviders: InjectionToken[],
  ) {
    return build([
      ...providers,
      {
        provide: cls,
        useFactory: (...args: never[]) => new cls(...args),
        inject: injectProviders,
      },
    ]);
  },
  provideAbstractClass(
    abstract: abstract new (...args: never[]) => unknown,
    concrete: new (...args: never[]) => unknown,
    injectProviders: InjectionToken[],
  ) {
    return build([
      ...providers,
      {
        provide: abstract,
        useFactory: (...args: never[]) => new concrete(...args),
        inject: injectProviders,
      },
    ]);
  },
});

export const buildProvider = () =>
  build([]) as unknown as ProviderBuilder<[], []>;
