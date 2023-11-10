import { Module } from '@nestjs/common';

import { HttpRequestMiddleware } from './http-request.middleware';
import { HttpRequestInterceptor } from './http-request.interceptor';
import { HttpRequestFilter } from './http-request.filter';

@Module({
  providers: [HttpRequestMiddleware, HttpRequestInterceptor, HttpRequestFilter],
  exports: [HttpRequestMiddleware, HttpRequestInterceptor, HttpRequestFilter],
})
export class HttpRequestModule {}
