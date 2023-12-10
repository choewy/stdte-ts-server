import { HttpException } from '@nestjs/common';

export class ExceptionDto {
  status: number;
  name: string;
  mesage: string;
  cause: unknown;

  constructor(e: HttpException) {
    this.status = e.getStatus();
    this.name = e.name;
    this.mesage = e.message;
    this.cause = e.cause;
  }
}
