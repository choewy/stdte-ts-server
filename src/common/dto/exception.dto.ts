import { HttpException } from '@nestjs/common';

export class Exception {
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

export class ExceptionDto {
  data: Exception;
  date: Date;

  constructor(e: HttpException) {
    this.data = new Exception(e);
    this.date = new Date();
  }
}
