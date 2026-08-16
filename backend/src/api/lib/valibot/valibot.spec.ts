import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Module,
  Post,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type {
  CallHandler,
  ExecutionContext,
  INestApplication,
} from '@nestjs/common';
import type { OpenAPIObject } from '@nestjs/swagger';
import { lastValueFrom, of } from 'rxjs';
import * as v from 'valibot';
import { integerSchema } from 'src/lib/integer';
import {
  ApiValibotResponse,
  createDto,
  patchNestSwaggerForValibot,
  registerComponent,
  ValibotSerializerInterceptor,
  ValibotValidationPipe,
} from './index';

const CreateThing = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1)),
  count: v.optional(integerSchema),
});
const CreateThingDto = createDto('CreateThingDto', CreateThing);
type CreateThingDto = v.InferOutput<typeof CreateThing>;

const Thing = v.object({
  id: integerSchema,
  name: v.string(),
  parent: v.nullable(v.string()),
});
const ThingDto = createDto('ThingDto', Thing);
type ThingDto = v.InferOutput<typeof Thing>;

const Origin = v.variant('type', [
  v.object({ type: v.literal('csv'), id: v.string() }),
  v.object({ type: v.literal('sheets'), id: v.string(), tableId: v.string() }),
]);
const OriginDto = createDto('OriginDto', Origin);
type OriginDto = v.InferOutput<typeof Origin>;

const ThingPage = v.object({ total: integerSchema, items: v.array(Thing) });
const ThingPageDto = createDto('ThingPageDto', ThingPage);
type ThingPageDto = v.InferOutput<typeof ThingPage>;

// --- nested DTOs: Team -> Speaker -> SpeakerCategory ---
// Neither is used as a body/response type directly; creating the DTO is what
// names them as components, so TeamDto $refs them instead of inlining.
const SpeakerCategory = v.object({ slug: v.string(), name: v.string() });
createDto('SpeakerCategoryDto', SpeakerCategory);

const Speaker = v.object({
  id: integerSchema,
  name: v.string(),
  categories: v.array(SpeakerCategory),
});
createDto('SpeakerDto', Speaker);

const Team = v.object({
  id: integerSchema,
  reference: v.string(),
  speakers: v.array(Speaker),
});
const TeamDto = createDto('TeamDto', Team);
type TeamDto = v.InferOutput<typeof Team>;

const CreateTeam = v.object({
  reference: v.pipe(v.string(), v.minLength(1)),
  // Nested *input* shape, distinct from the response Speaker.
  speakers: v.array(v.object({ name: v.pipe(v.string(), v.minLength(1)) })),
});
const CreateTeamDto = createDto('CreateTeamDto', CreateTeam);
type CreateTeamDto = v.InferOutput<typeof CreateTeam>;

// A shape with no DTO of its own, named so it becomes a component anyway.
const Address = registerComponent(
  'AddressDto',
  v.object({ line1: v.string(), city: v.string() }),
);
const Venue = v.object({ name: v.string(), address: Address });
const VenueDto = createDto('VenueDto', Venue);
type VenueDto = v.InferOutput<typeof Venue>;

// Parent DTO created BEFORE the nested schema is named, to prove that only
// registration-before-createDocument matters, not relative declaration order.
const Wheel = v.object({ size: integerSchema });
const Car = v.object({ wheels: v.array(Wheel) });
const CarDto = createDto('CarDto', Car);
type CarDto = v.InferOutput<typeof Car>;
createDto('WheelDto', Wheel);

// Self-referential shape.
type InstitutionTree = { name: string; children: InstitutionTree[] };
const InstitutionTree: v.GenericSchema<InstitutionTree> = v.object({
  name: v.string(),
  children: v.array(v.lazy(() => InstitutionTree)),
});
const InstitutionTreeDto = createDto('InstitutionTreeDto', InstitutionTree);

@Controller('things')
class ThingController {
  @ApiValibotResponse(ThingDto, { isArray: true })
  @Get()
  list(): ThingDto[] {
    return [];
  }

  @ApiValibotResponse(ThingDto, { status: 201 })
  @Post()
  create(@Body() body: CreateThingDto): ThingDto {
    return body as unknown as ThingDto;
  }

  @Post('origin')
  origin(@Body() body: OriginDto): OriginDto {
    return body;
  }

  @ApiValibotResponse(ThingPageDto)
  @Get('page')
  page(): ThingPageDto {
    return { total: 0, items: [] };
  }
}

@Controller('teams')
class TeamController {
  @ApiValibotResponse(TeamDto, { isArray: true })
  @Get()
  list(): TeamDto[] {
    return [];
  }

  @ApiValibotResponse(TeamDto, { status: 201 })
  @Post()
  create(@Body() body: CreateTeamDto): TeamDto {
    return body as unknown as TeamDto;
  }

  @ApiValibotResponse(VenueDto)
  @Get('venue')
  venue(): VenueDto {
    return { name: '', address: { line1: '', city: '' } };
  }

  @ApiValibotResponse(InstitutionTreeDto)
  @Get('tree')
  tree(): InstitutionTree {
    return { name: '', children: [] };
  }

  @ApiValibotResponse(CarDto)
  @Get('car')
  car(): CarDto {
    return { wheels: [] };
  }
}

@Module({ controllers: [ThingController, TeamController] })
class TestModule {}

type JsonRecord = Record<string, unknown>;

const asRecord = (value: unknown): JsonRecord => value as JsonRecord;

describe('valibot <-> nest integration', () => {
  let app: INestApplication;
  let document: OpenAPIObject;

  const schemaFor = (name: string): JsonRecord =>
    asRecord(document.components?.schemas?.[name]);

  const operation = (route: string, method: 'get' | 'post'): JsonRecord =>
    asRecord(asRecord(document.paths[route])[method]);

  /** Unwraps the `content['application/json'].schema` of a body/response. */
  const jsonSchemaOf = (carrier: unknown): unknown =>
    asRecord(asRecord(asRecord(carrier)['content'])['application/json'])[
      'schema'
    ];

  beforeAll(async () => {
    patchNestSwaggerForValibot();
    app = await NestFactory.create(TestModule, { logger: false });
    await app.init();
    document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('test').setVersion('1.0').build(),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  describe('openapi generation', () => {
    it('registers each valibot DTO as a named component', () => {
      expect(Object.keys(document.components?.schemas ?? {}).sort()).toEqual([
        'AddressDto',
        'CarDto',
        'CreateTeamDto',
        'CreateThingDto',
        'InstitutionTreeDto',
        'OriginDto',
        'SpeakerCategoryDto',
        'SpeakerDto',
        'TeamDto',
        'ThingDto',
        'ThingPageDto',
        'VenueDto',
        'WheelDto',
      ]);
    });

    it('emits object schemas with required/optional split', () => {
      expect(document.components?.schemas?.['CreateThingDto']).toEqual({
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1 },
          count: { type: 'integer' },
        },
        required: ['name'],
      });
    });

    it('converts draft-07 nullable unions to OpenAPI 3.0 `nullable`', () => {
      const thing = schemaFor('ThingDto');
      const parent = asRecord(asRecord(thing.properties)['parent']);
      expect(parent).toEqual({ type: 'string', nullable: true });
      expect(parent).not.toHaveProperty('anyOf');
    });

    it('converts variants to oneOf with `const` rewritten to `enum`', () => {
      const origin = schemaFor('OriginDto');
      const oneOf = origin.oneOf as JsonRecord[];
      expect(oneOf).toHaveLength(2);
      expect(asRecord(asRecord(oneOf[0]!.properties)['type'])).toEqual({
        enum: ['csv'],
      });
    });

    it('$refs the DTO from request bodies', () => {
      expect(jsonSchemaOf(operation('/things', 'post').requestBody)).toEqual({
        $ref: '#/components/schemas/CreateThingDto',
      });
    });

    it('$refs the DTO from responses, including arrays', () => {
      const responses = asRecord(operation('/things', 'get').responses);
      expect(jsonSchemaOf(responses['200'])).toEqual({
        type: 'array',
        items: { $ref: '#/components/schemas/ThingDto' },
      });
    });

    it('hoists declared definitions into components and $refs them', () => {
      expect(document.components?.schemas?.['ThingPageDto']).toEqual({
        type: 'object',
        properties: {
          total: { type: 'integer' },
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/ThingDto' },
          },
        },
        required: ['total', 'items'],
      });
    });
  });

  describe('nested DTOs', () => {
    it('$refs a nested DTO instead of inlining it', () => {
      expect(schemaFor('TeamDto')).toEqual({
        type: 'object',
        properties: {
          id: { type: 'integer' },
          reference: { type: 'string' },
          speakers: {
            type: 'array',
            items: { $ref: '#/components/schemas/SpeakerDto' },
          },
        },
        required: ['id', 'reference', 'speakers'],
      });
    });

    it('emits the nested DTO as its own component, one level deeper too', () => {
      expect(schemaFor('SpeakerDto')).toEqual({
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          categories: {
            type: 'array',
            items: { $ref: '#/components/schemas/SpeakerCategoryDto' },
          },
        },
        required: ['id', 'name', 'categories'],
      });
      expect(schemaFor('SpeakerCategoryDto')).toHaveProperty(
        'properties.slug',
        { type: 'string' },
      );
    });

    it('does not turn the parent into a $ref to itself', () => {
      expect(schemaFor('TeamDto')).not.toHaveProperty('$ref');
      expect(schemaFor('SpeakerDto')).not.toHaveProperty('$ref');
    });

    it('inlines an anonymous nested shape that was never named', () => {
      const speakers = asRecord(
        asRecord(schemaFor('CreateTeamDto').properties)['speakers'],
      );
      expect(speakers['items']).toEqual({
        type: 'object',
        properties: { name: { type: 'string', minLength: 1 } },
        required: ['name'],
      });
    });

    it('names a shape via registerComponent even with no DTO of its own', () => {
      expect(asRecord(schemaFor('VenueDto').properties)['address']).toEqual({
        $ref: '#/components/schemas/AddressDto',
      });
      expect(schemaFor('AddressDto')).toHaveProperty('properties.city');
    });

    it('handles self-referential schemas', () => {
      const tree = schemaFor('InstitutionTreeDto');
      expect(asRecord(asRecord(tree.properties)['children'])['items']).toEqual({
        $ref: '#/components/schemas/InstitutionTreeDto',
      });
    });

    it('$refs a nested schema named after the parent DTO was created', () => {
      expect(asRecord(schemaFor('CarDto').properties)['wheels']).toEqual({
        type: 'array',
        items: { $ref: '#/components/schemas/WheelDto' },
      });
    });

    it('rejects a duplicate component name instead of overwriting', () => {
      expect(() =>
        registerComponent('SpeakerDto', v.object({ different: v.string() })),
      ).toThrowError(/Duplicate OpenAPI component name "SpeakerDto"/);
    });

    it('tolerates re-registering the same schema under the same name', () => {
      expect(() => registerComponent('TeamDto', Team)).not.toThrow();
    });

    it('prunes registered components unreachable from the parent', () => {
      // TeamDto's conversion is offered the whole registry; only what it
      // actually references may appear alongside it.
      const teamRefs = JSON.stringify(schemaFor('TeamDto'));
      expect(teamRefs).not.toContain('AddressDto');
      expect(teamRefs).not.toContain('OriginDto');
    });
  });

  describe('validation pipe', () => {
    const pipe = new ValibotValidationPipe();
    const meta = {
      type: 'body' as const,
      metatype: CreateThingDto,
      data: undefined,
    };

    it('returns parsed output and applies transforms', () => {
      expect(pipe.transform({ name: '  Kyoto  ' }, meta)).toEqual({
        name: 'Kyoto',
      });
    });

    it('strips unknown keys', () => {
      expect(pipe.transform({ name: 'a', sneaky: 1 }, meta)).toEqual({
        name: 'a',
      });
    });

    it('throws BadRequest with dot paths', () => {
      let thrown: unknown;
      try {
        pipe.transform({ name: '' }, meta);
      } catch (error) {
        thrown = error;
      }
      expect(thrown).toBeInstanceOf(BadRequestException);
      const response = asRecord((thrown as BadRequestException).getResponse());
      expect((thrown as BadRequestException).getStatus()).toBe(400);
      expect(asRecord((response['errors'] as unknown[])[0])['path']).toBe(
        'name',
      );
    });

    it('passes through params with no valibot metatype', () => {
      expect(
        pipe.transform('raw', {
          type: 'param',
          metatype: String,
          data: 'id',
        }),
      ).toBe('raw');
    });
  });

  describe('serializer interceptor', () => {
    const interceptor = new ValibotSerializerInterceptor(new Reflector());

    /** Minimal ExecutionContext: the interceptor only reads handler + class. */
    const contextFor = (handlerName: 'list' | 'origin'): ExecutionContext =>
      ({
        getHandler: () => ThingController.prototype[handlerName],
        getClass: () => ThingController,
      }) as unknown as ExecutionContext;

    const handlerOf = (value: unknown): CallHandler => ({
      handle: () => of(value),
    });

    it('strips fields absent from the declared response schema', async () => {
      const out = await lastValueFrom(
        interceptor.intercept(
          contextFor('list'),
          handlerOf([{ id: 1, name: 'a', parent: null, token: 'SECRET' }]),
        ),
      );
      expect(out).toEqual([{ id: 1, name: 'a', parent: null }]);
    });

    it('passes through handlers with no declared schema', async () => {
      const payload = { anything: true };
      const out = await lastValueFrom(
        interceptor.intercept(contextFor('origin'), handlerOf(payload)),
      );
      expect(out).toBe(payload);
    });

    it('raises 500 when the handler breaks its own contract', async () => {
      await expect(
        lastValueFrom(
          interceptor.intercept(
            contextFor('list'),
            handlerOf([{ id: 'not-a-number' }]),
          ),
        ),
      ).rejects.toBeInstanceOf(InternalServerErrorException);
    });
  });
});
