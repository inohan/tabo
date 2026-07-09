import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  const config = new DocumentBuilder()
    .setTitle('Tabo')
    .setDescription('Tabo API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('schema', app, documentFactory, {
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          name: '1. Tabo API',
          url: '/schema-json',
        },
        {
          name: '2. Auth API',
          url: '/auth/open-api/generate-schema',
        },
      ],
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
