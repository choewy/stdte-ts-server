export class ErrorDto {
  name?: string;
  message?: string;
  cause?: string;

  constructor(e?: any) {
    this.name = e?.name;
    this.name = e?.mesage;
    this.cause = e?.cause;
  }
}
