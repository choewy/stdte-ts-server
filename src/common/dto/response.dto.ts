export class ResponseDto<D> {
  data: D | null;
  date: Date;

  constructor(data?: D) {
    this.data = data ?? null;
    this.date = new Date();
  }
}
