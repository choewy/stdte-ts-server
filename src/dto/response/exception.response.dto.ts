import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class ExceptionResponseDetailsDto {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  message: string;

  constructor(details?: unknown) {
    if (details instanceof Error) {
      this.name = details.name;
      this.message = details.message;
    }
  }
}

export class ExceptionResponseDto {
  @ApiResponseProperty({ type: String })
  message: string;

  @ApiResponseProperty({ type: Number, enum: HttpStatus })
  statusCode: HttpStatus;

  @ApiResponseProperty({ type: String })
  error: string;

  @ApiResponseProperty({ type: ExceptionResponseDetailsDto })
  details: ExceptionResponseDetailsDto;

  constructor(exception: HttpException) {
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'object') {
      Object.assign(this, exception.getResponse());
    }
  }
}
