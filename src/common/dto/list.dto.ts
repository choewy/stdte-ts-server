import { DtoConstructor } from '../types';

export class ListDto<D, Q, T = any> {
  total: number;
  rows: (D | T)[];
  query: Q;

  constructor(query: Q, result: [D[], number], Dto?: DtoConstructor<D, T>) {
    this.total = result[1];
    this.rows = result[0];

    if (Dto) {
      this.rows = result[0].map((row) => new Dto(row));
    }

    this.query = query;
  }
}
