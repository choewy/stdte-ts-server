import cookieParser from 'cookie-parser';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CorsConfig } from './config';
import { HttpExceptionFilter } from './core';
import { ValidationException } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

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

  await app.listen(3000);
}

bootstrap();
