import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';
import { getEnumValuesOnlyNumber } from '@server/common';

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

  @ApiResponseProperty({ type: Number, example: getEnumValuesOnlyNumber(HttpStatus).join(' | ') })
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
