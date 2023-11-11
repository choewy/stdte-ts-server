import { Module } from '@nestjs/common';

import { HttpRequestMiddleware } from './http-request.middleware';
import { HttpRequestLogger } from './http-request.logger';
import { HttpRequestInterceptor } from './http-request.interceptor';
import { HttpRequestFilter } from './http-request.filter';

@Module({
  providers: [HttpRequestMiddleware, HttpRequestLogger, HttpRequestInterceptor, HttpRequestFilter],
  exports: [HttpRequestMiddleware, HttpRequestLogger, HttpRequestInterceptor, HttpRequestFilter],
})
export class HttpRequestModule {}
