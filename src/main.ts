import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CorsConfig, SystemConfig } from './config';
import { ValidationException } from './common';
import { HttpExceptionFilter, LogInterceptor, TransformInterceptor, WinstonLogger } from './core';

import { AppModule } from './app.module';
import { Settings } from 'luxon';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new WinstonLogger().create() });

  Settings.defaultZone = new SystemConfig().getTimezone();

  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.enableCors(new CorsConfig().getCorsOptions());
  app.useGlobalInterceptors(app.get(LogInterceptor), app.get(TransformInterceptor));
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
