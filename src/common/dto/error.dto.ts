export class ErrorDto {
  name?: string;
  message?: string;
  cause?: string;
  details?: any;

  constructor(e?: any, details?: any) {
    this.name = e?.name;
    this.name = e?.message;
    this.cause = e?.cause;
    this.details = details;
  }
}
