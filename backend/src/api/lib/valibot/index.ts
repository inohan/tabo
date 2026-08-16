export {
  createDto,
  isValibotDto,
  registerComponent,
  getComponentDefinitions,
  VALIBOT_SCHEMA,
  VALIBOT_DEFINITIONS,
} from './dto';
export type { ValibotDto } from './dto';
export { ValibotValidationPipe } from './validation.pipe';
export { ValibotSerializerInterceptor } from './serializer.interceptor';
export {
  ApiValibotResponse,
  VALIBOT_RESPONSE_SCHEMA,
} from './response.decorator';
export type { ApiValibotResponseOptions } from './response.decorator';
export { patchNestSwaggerForValibot } from './swagger';
export type { ValibotSwaggerOptions } from './swagger';
