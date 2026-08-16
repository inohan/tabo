import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import * as v from 'valibot';
import { VALIBOT_RESPONSE_SCHEMA } from './response.decorator';

/**
 * Serializes handler return values through the schema declared by
 * `@ApiValibotResponse`. Replaces `ClassSerializerInterceptor`.
 *
 * `v.object` drops unknown keys, so this is what guarantees internal fields
 * (tournament `token`, most importantly) cannot leak into a response.
 */
@Injectable()
export class ValibotSerializerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ValibotSerializerInterceptor.name);

  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const schema = this.reflector.get<v.GenericSchema | undefined>(
      VALIBOT_RESPONSE_SCHEMA,
      context.getHandler(),
    );
    if (schema === undefined) {
      return next.handle();
    }

    return next.handle().pipe(
      map((value: unknown) => {
        const result = v.safeParse(schema, value);
        if (result.success) {
          return result.output;
        }
        // The handler returned something its own contract forbids: a server
        // bug, not a client one. Fail loudly rather than ship an off-spec body.
        this.logger.error(
          `Response does not match declared schema for ${context.getClass().name}.${context.getHandler().name}: ` +
            result.issues
              .map(
                (issue) =>
                  `${v.getDotPath(issue) ?? '<root>'}: ${issue.message}`,
              )
              .join('; '),
        );
        throw new InternalServerErrorException();
      }),
    );
  }
}
