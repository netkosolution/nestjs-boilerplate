import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties that do not have any decorators
      forbidNonWhitelisted: true, // throw error if non-whitelisted values are present
      transform: true, // transform payloads to be objects typed according to their DTO classes
      transformOptions: {
        enableImplicitConversion: true, // automatically transform primitive types
      },
      errorHttpStatusCode: 422, // use 422 instead of 400 for validation errors
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS API Boilerplate')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This is the key we'll use to reference this security scheme
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
