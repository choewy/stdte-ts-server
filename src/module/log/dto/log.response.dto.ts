import { ApiResponseProperty } from '@nestjs/swagger';

import { HttpRequestLog } from '@server/common';
import { ListResponseType } from '@server/dto';

import { GetLogListBodyDto } from './get-log-list.body.dto';

export class LogStatusResponseDto {
  @ApiResponseProperty({ type: Number })
  code: number;

  @ApiResponseProperty({ type: String })
  message: string;

  constructor(statusCode: number, statusMessage: string) {
    this.code = statusCode;
    this.message = statusMessage;
  }
}

export class LogExceptionResponseDto {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  message: string;

  constructor(exceptionName: string, exceptionMessage: string) {
    this.name = exceptionName;
    this.message = exceptionMessage;
  }
}

export class LogErrorResponseDto {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  message: string;

  @ApiResponseProperty({ type: String })
  stack: string;

  constructor(name: string, message: string, stack: string) {
    this.name = name;
    this.message = message;
    this.stack = stack;
  }
}

export class HttpRequestLogResponseDto {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String })
  ip: string;

  @ApiResponseProperty({ type: String })
  method: string;

  @ApiResponseProperty({ type: String })
  path: string;

  @ApiResponseProperty({ type: Object })
  params: object = {};

  @ApiResponseProperty({ type: Object })
  query: object = {};

  @ApiResponseProperty({ type: Object })
  body: object = {};

  @ApiResponseProperty({ type: LogStatusResponseDto })
  status: LogStatusResponseDto = null;

  @ApiResponseProperty({ type: LogExceptionResponseDto })
  exception: LogExceptionResponseDto = null;

  @ApiResponseProperty({ type: LogErrorResponseDto })
  error: LogErrorResponseDto = null;

  @ApiResponseProperty({ type: Date })
  requestAt: Date;

  @ApiResponseProperty({ type: Date })
  responseAt: Date;

  constructor(httpRequestLog: HttpRequestLog) {
    this.id = httpRequestLog.id;
    this.ip = httpRequestLog.ip;
    this.method = httpRequestLog.method;
    this.path = httpRequestLog.path;

    if (httpRequestLog.params) {
      this.params = JSON.parse(httpRequestLog.params);
    }

    if (httpRequestLog.query) {
      this.query = JSON.parse(httpRequestLog.query);
    }

    if (httpRequestLog.body) {
      this.body = JSON.parse(httpRequestLog.body);
    }

    if (httpRequestLog.statusCode ?? httpRequestLog.statusMessage) {
      this.status = new LogStatusResponseDto(httpRequestLog.statusCode, httpRequestLog.statusMessage);
    }

    if (httpRequestLog.exceptionName ?? httpRequestLog.exceptionMessage) {
      this.exception = new LogExceptionResponseDto(httpRequestLog.exceptionName, httpRequestLog.exceptionMessage);
    }

    if (httpRequestLog.errorName ?? httpRequestLog.errorMessage ?? httpRequestLog.errorStack) {
      this.error = new LogErrorResponseDto(
        httpRequestLog.errorName,
        httpRequestLog.errorMessage,
        httpRequestLog.errorStack,
      );
    }

    this.requestAt = httpRequestLog.createdAt;
    this.responseAt = httpRequestLog.updatedAt;
  }
}

export class HttpRequestLogListResponseDto extends ListResponseType(HttpRequestLogResponseDto, GetLogListBodyDto) {}
