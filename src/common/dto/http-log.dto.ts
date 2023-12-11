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
        ip: this.request.ip,
        ips: this.request.ips.length === 0 ? undefined : this.request.ips,
        'x-forwarded-for': this.request.headers['x-forwarded-for'],
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
    const name = exception.name;
    const status = exception.getStatus();
    return [`${this.request.method}(${this.request.path})`, `${name}(${status})`, this.requestInfo()].join(' - ');
  }

  getNextMessage() {
    return [`${this.request.method}(${this.request.path})`, this.response.statusCode, this.requestInfo()].join(' - ');
  }
}
