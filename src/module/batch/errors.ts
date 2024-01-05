import { ErrorDto } from '@server/common';

export class LogUploadBatchFailError extends Error {
  cause: ErrorDto;

  constructor(e?: any) {
    super(e);

    this.cause = new ErrorDto(e);
  }
}
