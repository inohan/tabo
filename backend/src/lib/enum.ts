export type Enumify<T extends Record<string, unknown>> = T[keyof T];

// Step 1: Union -> Intersection (via contravariance trick)
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

// Step 2: pluck the "last" member out of a union
type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R
    ? R
    : never;

// Step 3: recursively peel members off the union into a tuple
type UnionToTuple<T, L = LastOf<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, L>>, L];

// Step 4: apply it to the values of an object type
type ValuesTuple<T> = UnionToTuple<T[keyof T]>;

export const getEnumValues = <T extends Record<string, string | number>>(
  e: T,
): ValuesTuple<T> => Object.values(e) as ValuesTuple<T>;
