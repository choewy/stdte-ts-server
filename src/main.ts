import express from 'express';
import cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { CorsConfig, ServerConfig } from '@server/common';
import { HttpRequestFilter, HttpRequestInterceptor } from '@server/core';
import { AppModule } from '@server/app.module';
import { AppSwagger } from '@server/app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsConfig = new CorsConfig();
  const serverConfig = new ServerConfig();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.enableCors(corsConfig.getCorsOptions());

  app.setGlobalPrefix('v1', { exclude: ['/'] });
  app.useGlobalInterceptors(await app.resolve(HttpRequestInterceptor));
  app.useGlobalFilters(await app.resolve(HttpRequestFilter));
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

  await app.listen(...serverConfig.getListenOptions());
}

bootstrap();
