import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CorsConfig } from './config';
import { HttpExceptionFilter, WinstonLogger, requestBinder } from './core';
import { ValidationException } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new WinstonLogger().create() });

  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(requestBinder);
  app.enableCors(new CorsConfig().getCorsOptions());
  app.useGlobalFilters(app.get(HttpExceptionFilter));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new ValidationException(errors),
      transform: true,
      transformOptions: {
        enableCircularCheck: true,
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableShutdownHooks();

  await app.listen(3000);
}

bootstrap();
