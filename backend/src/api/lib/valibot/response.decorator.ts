import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import * as v from 'valibot';
import { ValibotDto, VALIBOT_SCHEMA } from './dto';

export const VALIBOT_RESPONSE_SCHEMA = 'valibot:response-schema';

export interface ApiValibotResponseOptions {
  status?: number;
  isArray?: boolean;
  description?: string;
}

/**
 * Declares the response contract for a handler.
 *
 * Drives both the OpenAPI response schema and the runtime serialization
 * performed by `ValibotSerializerInterceptor`, so the documented shape and the
 * shape actually sent cannot drift apart.
 */
export const ApiValibotResponse = <TSchema extends v.GenericSchema>(
  dto: ValibotDto<TSchema>,
  {
    status = 200,
    isArray = false,
    description,
  }: ApiValibotResponseOptions = {},
) =>
  applyDecorators(
    SetMetadata(
      VALIBOT_RESPONSE_SCHEMA,
      isArray ? v.array(dto[VALIBOT_SCHEMA]) : dto[VALIBOT_SCHEMA],
    ),
    ApiResponse({ status, type: isArray ? [dto] : dto, description }),
  );
