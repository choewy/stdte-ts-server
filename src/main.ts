import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { Settings } from 'luxon';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CorsConfig, SystemConfig } from './config';
import { ErrorDto, ValidationException } from './common';
import { HttpExceptionFilter, LogInterceptor, RedisIoAdapter, TransformInterceptor, WinstonLogger } from './core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new WinstonLogger().create() });

  Settings.defaultZone = new SystemConfig().getTimezone();

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);
  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.enableShutdownHooks();
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

  const logger = new Logger();

  process.on('uncaughtException', (e, listener) => {
    const error = new ErrorDto(e, listener);
    logger.error('uncaughtException', error, bootstrap.name);
  });

  process.on('unhandledRejection', async (reason, promise) => {
    const error = new ErrorDto(reason, promise);
    logger.error('unhandledRejection', error, bootstrap.name);
  });

  await app.listen(3000);
}

bootstrap();
