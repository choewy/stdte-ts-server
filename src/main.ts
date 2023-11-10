import express from 'express';
import cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { CorsConfig, ServerConfig } from '@server/common';
import { AppModule } from '@server/app.module';
import { LoggerInterceptor } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsConfig = new CorsConfig();
  const serverConfig = new ServerConfig();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.enableCors(corsConfig.getCorsOptions());
  app.useGlobalInterceptors(app.get(LoggerInterceptor));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        enableCircularCheck: true,
      },
    }),
  );

  await app.listen(...serverConfig.getListenOptions());
}

bootstrap();
