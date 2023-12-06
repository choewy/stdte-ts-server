import cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CorsConfig } from './config';
import { HttpExceptionFilter } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors(new CorsConfig().getCorsOptions());
  app.useGlobalFilters(app.get(HttpExceptionFilter));

  await app.listen(3000);
}

bootstrap();
