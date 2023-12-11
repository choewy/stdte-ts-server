import { Response } from 'express';

import { HttpException } from '@nestjs/common';

import { Request } from '../types';

export class HttpLogDto {
  constructor(
    private request: Request,
    private response: Response,
  ) {}

  private requestInfo(): string {
    return JSON.stringify(
      {
        id: this.request.id,
        params: this.request.params,
        query: this.request.query,
        body: this.request.body,
        requestedAt: this.request.requesteAt,
        responsedAt: this.request.responsedAt,
      },
      null,
      2,
    );
  }

  getExceptionMessage(exception: HttpException) {
    return [
      this.request.ip,
      `${this.request.method}(${this.request.path})`,
      `${exception.name}(${exception.getStatus()})`,
      this.requestInfo(),
    ].join(' - ');
  }

  getNextMessage() {
    return [
      this.request.ip,
      `${this.request.method}(${this.request.path})`,
      this.response.statusCode,
      this.requestInfo(),
    ].join(' - ');
  }
}
