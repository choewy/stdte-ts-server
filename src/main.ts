import express from 'express';
import cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';

import { CorsConfig } from '@server/common';
import { AppModule } from '@server/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.enableCors(new CorsConfig().getCorsOptions());

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

  await app.listen(8000);
}

bootstrap();
