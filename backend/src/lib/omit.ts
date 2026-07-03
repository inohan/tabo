export const omit = <T extends object, S extends string[]>(
  obj: T,
  keys: S,
): Omit<T, S[number]> => {
  const keysSet = new Set(keys);
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !keysSet.has(k)),
  ) as Omit<T, S[number]>;
};
