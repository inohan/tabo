import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as v from 'valibot';
import { isValibotDto, VALIBOT_SCHEMA } from './dto';

@Injectable()
export class ValibotValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const { metatype } = metadata;
    if (!isValibotDto(metatype)) {
      return value;
    }

    const result = v.safeParse(metatype[VALIBOT_SCHEMA], value);
    if (result.success) {
      return result.output;
    }

    throw new BadRequestException({
      message: 'Validation failed',
      errors: result.issues.map((issue) => ({
        path: v.getDotPath(issue),
        message: issue.message,
      })),
    });
  }
}
