import * as v from 'valibot';

/**
 * Marker holding the valibot schema on a DTO class.
 *
 * A class is used rather than the bare schema so that `emitDecoratorMetadata`
 * still records a `design:paramtypes` entry for `@Body()`/`@Query()` params.
 * That is what lets both the validation pipe and the swagger explorer find the
 * schema without any extra decorator at the call site.
 */
export const VALIBOT_SCHEMA = Symbol('valibot:schema');

export const VALIBOT_DEFINITIONS = Symbol('valibot:definitions');

export interface ValibotDto<TSchema extends v.GenericSchema> {
  new (): v.InferOutput<TSchema>;
  [VALIBOT_SCHEMA]: TSchema;
  [VALIBOT_DEFINITIONS]: Record<string, v.GenericSchema> | undefined;
}

/**
 * Schema -> component name, keyed by object identity.
 *
 * Every named schema is offered to every conversion, so a schema nested inside
 * another DTO is emitted as its own component and `$ref`d rather than inlined.
 * Entries that turn out to be unreachable are pruned after conversion.
 */
const componentRegistry = new Map<v.GenericSchema, string>();
const nameRegistry = new Map<string, v.GenericSchema>();

/**
 * Names a schema as a reusable OpenAPI component without creating a DTO class.
 *
 * Only needed for a shape that is never itself a request body or response —
 * `createDto` already registers the schemas it wraps.
 *
 * @throws if `name` is already taken by a different schema. Component names are
 * a single flat namespace, so a collision would otherwise silently overwrite one
 * schema with the other and ship a wrong contract.
 */
export const registerComponent = <TSchema extends v.GenericSchema>(
  name: string,
  schema: TSchema,
): TSchema => {
  const existing = nameRegistry.get(name);
  if (existing !== undefined && existing !== schema) {
    throw new Error(
      `Duplicate OpenAPI component name "${name}": already registered for a different schema. ` +
        `Component names share one global namespace — rename one of them.`,
    );
  }
  componentRegistry.set(schema, name);
  nameRegistry.set(name, schema);
  return schema;
};

/** The registry in the shape `toJsonSchema`'s `definitions` option expects. */
export const getComponentDefinitions = (): Record<string, v.GenericSchema> =>
  Object.fromEntries(
    [...componentRegistry].map(([schema, name]) => [name, schema]),
  );

export const isValibotDto = (
  type: unknown,
): type is ValibotDto<v.GenericSchema> =>
  typeof type === 'function' && VALIBOT_SCHEMA in type;

/**
 * Builds a DTO class from a valibot schema.
 *
 * The `name` becomes the OpenAPI component name, so it must be unique across
 * the document. Pair it with a same-named type alias so the identifier works in
 * both value and type position:
 *
 * ```ts
 * export const CreateInstitutionDto = createDto('CreateInstitutionDto', CreateInstitution);
 * export type CreateInstitutionDto = v.InferOutput<typeof CreateInstitution>;
 * ```
 *
 * Prefer this over `class X extends createDto(...)`: a class cannot extend a
 * union, so the `extends` form fails for `v.variant` / `v.union` schemas.
 *
 * Nesting needs no special handling — a DTO's schema is registered globally, so
 * any other DTO embedding it gets a `$ref` to its component automatically:
 *
 * ```ts
 * export const SpeakerDto = createDto('SpeakerDto', Speaker);
 * // TeamDto.speakers -> array of $ref '#/components/schemas/SpeakerDto'
 * export const TeamDto = createDto('TeamDto', v.object({ speakers: v.array(Speaker) }));
 * ```
 */
export const createDto = <TSchema extends v.GenericSchema>(
  name: string,
  schema: TSchema,
  /**
   * Extra sub-schemas to name as components, for shapes with no DTO of their
   * own. Equivalent to calling {@link registerComponent} on each.
   */
  definitions?: Record<string, v.GenericSchema>,
): ValibotDto<TSchema> => {
  registerComponent(name, schema);
  for (const [definitionName, definitionSchema] of Object.entries(
    definitions ?? {},
  )) {
    registerComponent(definitionName, definitionSchema);
  }
  const dto = { [name]: class {} }[name] as unknown as ValibotDto<TSchema>;
  Object.defineProperty(dto, VALIBOT_SCHEMA, {
    value: schema,
    enumerable: false,
  });
  Object.defineProperty(dto, VALIBOT_DEFINITIONS, {
    value: definitions,
    enumerable: false,
  });
  return dto;
};
