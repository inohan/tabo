import { toJsonSchema } from '@valibot/to-json-schema';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import {
  getComponentDefinitions,
  isValibotDto,
  VALIBOT_DEFINITIONS,
  VALIBOT_SCHEMA,
} from './dto';

type JsonSchema = Record<string, unknown>;
type SchemaObject = Record<string, unknown>;

interface SchemaObjectFactory {
  exploreModelSchema(
    type: unknown,
    schemas: Record<string, SchemaObject>,
    pendingSchemasRefs?: string[],
  ): string;
}

/**
 * `@nestjs/swagger` does not expose `SchemaObjectFactory` through its `exports`
 * map, so it is loaded by absolute path relative to the package entrypoint.
 * This is the load-bearing hack of this module and the reason it should be
 * dropped in favour of `standardSchemaConverter` on v12.
 */
const loadSchemaObjectFactory = (): {
  prototype: SchemaObjectFactory;
} => {
  const require = createRequire(__filename);
  const distDir = path.dirname(require.resolve('@nestjs/swagger'));
  return (
    require(path.join(distDir, 'services', 'schema-object-factory.js')) as {
      SchemaObjectFactory: { prototype: SchemaObjectFactory };
    }
  ).SchemaObjectFactory;
};

/**
 * `toJsonSchema` emits draft-07. OpenAPI 3.0 is only a near-superset of it, so
 * the two known divergences are rewritten here:
 * - `{ anyOf: [X, { type: 'null' }] }` -> `X` + `nullable: true`
 * - `{ const: x }` -> `{ enum: [x] }`
 *
 * Skip this by targeting OpenAPI 3.1 (`DocumentBuilder.setOpenAPIVersion`),
 * which is a true JSON Schema superset.
 */
const toOpenApi30 = (schema: unknown): unknown => {
  if (Array.isArray(schema)) {
    return schema.map(toOpenApi30);
  }
  if (schema === null || typeof schema !== 'object') {
    return schema;
  }

  const input = schema as JsonSchema;
  const output: JsonSchema = {};

  for (const [key, value] of Object.entries(input)) {
    if (key === '$schema') continue;
    if (key === '$ref' && typeof value === 'string') {
      output[key] = value.replace(
        /^#\/(\$defs|definitions)\//,
        '#/components/schemas/',
      );
      continue;
    }
    output[key] = toOpenApi30(value);
  }

  if ('const' in output) {
    const constValue = output.const;
    delete output.const;
    output.enum ??= [constValue];
  }

  const anyOf = output.anyOf;
  if (Array.isArray(anyOf)) {
    const nonNull = anyOf.filter(
      (member): member is JsonSchema =>
        !(
          member !== null &&
          typeof member === 'object' &&
          (member as JsonSchema).type === 'null'
        ),
    );
    if (nonNull.length !== anyOf.length) {
      delete output.anyOf;
      output.nullable = true;
      if (nonNull.length === 1) {
        Object.assign(output, nonNull[0]);
      } else {
        output.anyOf = nonNull;
      }
    }
  }

  return output;
};

/** Name targeted by a `#/$defs/<name>` or `#/definitions/<name>` pointer. */
const refTarget = (ref: unknown): string | undefined => {
  if (typeof ref !== 'string') return undefined;
  return /^#\/(?:\$defs|definitions)\/(.+)$/.exec(ref)?.[1];
};

/** Collects `#/$defs/<name>` / `#/definitions/<name>` targets within a value. */
const collectRefs = (value: unknown, into: Set<string>): void => {
  if (Array.isArray(value)) {
    value.forEach((item) => collectRefs(item, into));
    return;
  }
  if (value === null || typeof value !== 'object') return;

  for (const [key, child] of Object.entries(value as JsonSchema)) {
    if (key === '$ref') {
      const target = refTarget(child);
      if (target !== undefined) into.add(target);
      continue;
    }
    collectRefs(child, into);
  }
};

/**
 * The registry is offered to every conversion, so most definitions come back
 * unused. Keeps only those transitively `$ref`d from `root`.
 */
const reachableDefinitions = (
  root: JsonSchema,
  definitions: JsonSchema,
): Set<string> => {
  const reachable = new Set<string>();
  const queue: string[] = [];
  const seed = new Set<string>();

  collectRefs(root, seed);
  queue.push(...seed);

  while (queue.length > 0) {
    const name = queue.shift();
    if (name === undefined || reachable.has(name)) continue;
    if (!(name in definitions)) continue;
    reachable.add(name);

    const nested = new Set<string>();
    collectRefs(definitions[name], nested);
    // A self-referential (recursive) schema resolves to itself; `reachable`
    // already guards against re-queueing it forever.
    queue.push(...nested);
  }

  return reachable;
};

export interface ValibotSwaggerOptions {
  /** Target OpenAPI 3.1 and keep raw JSON Schema output. */
  openApi31?: boolean;
}

/**
 * Teaches `@nestjs/swagger` to render DTO classes created by {@link createDto}.
 *
 * Call once before `SwaggerModule.createDocument`. `@nestjs/swagger` v12 makes
 * this obsolete via the `standardSchemaConverter` document option.
 */
const PATCHED = Symbol.for('valibot:swagger-patched');

export const patchNestSwaggerForValibot = (
  options: ValibotSwaggerOptions = {},
): void => {
  const factory = loadSchemaObjectFactory().prototype;
  // Bootstrap and tests both patch; without this the wrapper wraps itself.
  if (PATCHED in factory) return;
  Object.defineProperty(factory, PATCHED, { value: true, enumerable: false });

  // Deliberately unbound: re-invoked below via `.call(this, ...)` so the
  // original keeps the receiver nest passes in.
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const original = factory.exploreModelSchema;

  factory.exploreModelSchema = function (
    this: SchemaObjectFactory,
    type: unknown,
    schemas: Record<string, SchemaObject>,
    pendingSchemasRefs?: string[],
  ): string {
    if (!isValibotDto(type)) {
      return original.call(this, type, schemas, pendingSchemasRefs);
    }

    const jsonSchema = toJsonSchema(type[VALIBOT_SCHEMA], {
      // Branded value objects are built with `v.transform`, which has no JSON
      // Schema equivalent. Ignoring keeps the underlying (pre-transform) shape,
      // which is what a client actually sends.
      errorMode: 'ignore',
      // Every registered component is offered so nested DTOs come out as
      // `$ref`s. This includes the DTO's own schema, which is what lets a
      // recursive schema reference itself by name instead of an anonymous def.
      definitions: {
        ...getComponentDefinitions(),
        ...type[VALIBOT_DEFINITIONS],
      },
    }) as JsonSchema;

    const { $defs, definitions, ...wrapper } = jsonSchema;
    const allDefinitions: JsonSchema = {
      ...(definitions as JsonSchema | undefined),
      ...($defs as JsonSchema | undefined),
    };

    // Because its own schema is in `definitions`, the root comes back as a bare
    // `{ $ref }`. Unwrap it, or the component would just point at itself.
    const rootRefName = refTarget(wrapper['$ref']);
    const root =
      rootRefName !== undefined && rootRefName in allDefinitions
        ? (allDefinitions[rootRefName] as JsonSchema)
        : wrapper;

    const convert = (schema: unknown): SchemaObject =>
      (options.openApi31 ? schema : toOpenApi30(schema)) as SchemaObject;

    for (const name of reachableDefinitions(root, allDefinitions)) {
      // A recursive root refs itself; that component is written below.
      if (name === rootRefName) continue;
      schemas[name] = convert(allDefinitions[name]);
    }
    schemas[type.name] = convert(root);
    return type.name;
  };
};
