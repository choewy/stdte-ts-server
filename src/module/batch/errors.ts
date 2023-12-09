import { ErrorDto } from '@server/common';

export class LogUploadBatchFailError extends Error {
  details: ErrorDto;

  constructor(e?: any) {
    super(e);

    this.details = new ErrorDto(e);
  }
}
