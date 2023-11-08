import express from 'express';
import cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { CorsConfig } from '@server/common';
import { AppModule } from '@server/app.module';
import { AppSwagger } from '@server/app.swagger';

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

  new AppSwagger(app).setup('api-docs');

  await app.listen(8000);
}

bootstrap();
