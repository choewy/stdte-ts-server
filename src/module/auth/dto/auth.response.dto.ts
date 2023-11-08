import { ApiResponseProperty } from '@nestjs/swagger';

import { ExceptionResponseDto } from '@server/common';

export class AuthResponseDto {
  @ApiResponseProperty({ type: Boolean })
  ok: boolean;

  @ApiResponseProperty({ type: ExceptionResponseDto })
  failReason?: ExceptionResponseDto;

  constructor(ok: boolean, failReason?: ExceptionResponseDto) {
    this.ok = ok;
    this.failReason = failReason;
  }
}
