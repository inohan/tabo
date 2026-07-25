import type * as TypeFest from 'type-fest';

declare global {
  type RequiredDeep<T> = TypeFest.RequiredDeep<T>;
  type PickDeep<T, PathUnion extends TypeFest.Paths<T>> = TypeFest.PickDeep<
    T,
    PathUnion
  >;
  type Simplify<T> = TypeFest.Simplify<T>;
  type SimplifyDeep<T, ExcludeType = never> = TypeFest.SimplifyDeep<
    T,
    ExcludeType
  >;
  type NonNullableDeep<T> = TypeFest.NonNullableDeep<T>;
}
