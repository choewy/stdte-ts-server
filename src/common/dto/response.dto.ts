import { v4 } from 'uuid';

import { ExceptionDto } from './exception.dto';

export class ResponseDto<D> {
  id: string;
  tag: string;
  data: D | ExceptionDto | null;

  constructor() {
    this.id = v4();
    this.tag = process.env.VERSION ?? '';
  }

  setData(data?: D | ExceptionDto | null) {
    this.data = data ?? null;
  }
}
