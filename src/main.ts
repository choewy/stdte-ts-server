import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { CorsConfig } from './config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(new CorsConfig().getCorsOptions());
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
