import * as v from 'valibot';

export const InstitutionCode = v.pipe(
  v.string(),
  v.nonEmpty(),
  v.maxGraphemes(20),
);

export const BreakCategorySlug = v.pipe(
  v.string(),
  v.maxGraphemes(50),
  v.regex(/^[-a-zA-Z0-9_]{1,50}$/),
);

export const SpeakerCategorySlug = v.pipe(
  v.string(),
  v.maxGraphemes(50),
  v.regex(/^[-a-zA-Z0-9_]{1,50}$/),
);

export const StringBoolean = v.union([
  v.boolean(),
  v.pipe(v.number(), v.toBoolean()),
  v.pipe(
    v.string(),
    v.transform((s) => {
      return ['true', 'yes', 't', 'y'].some(
        (truly) => s.toLowerCase() === truly,
      );
    }),
  ),
]);

type DefaultValue<T> = (() => T) | T;
const resolveDefault = <T>(default_: DefaultValue<T>): T => {
  return typeof default_ === 'function' ? (default_ as () => T)() : default_;
};

export function doubleDashAsNull<
  TWrapped extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
  TDefault = null,
>(wrapped: TWrapped, default_: DefaultValue<TDefault> = null as TDefault) {
  return v.union([
    v.pipe(
      v.literal('--'),
      v.transform(() => resolveDefault(default_)),
    ),
    wrapped,
  ]);
}

export const splitByDelimiter = (delimiter: string) =>
  v.pipe(
    v.string(),
    v.transform((s) =>
      s
        .split(delimiter)
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  );

/**
 * Resolves null into undefined.
 * The original v.nullable / v.nullish behavior is not what we want - if a default_ is provided, it converts null/undefined into default_, then calls the wrapper.
 * This function is a workaround for this.
 * @param wrapped Wrapped value
 * @returns OptionalSchema
 */
export const nullish = <
  TWrapped extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(
  wrapped: TWrapped,
) =>
  v.optional(
    v.union([
      v.pipe(
        v.null(),
        v.transform(() => undefined),
      ),
      wrapped,
    ]),
  );
