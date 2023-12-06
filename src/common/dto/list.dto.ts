export class ListDto<D, Q> {
  total: number;
  rows: D[];
  query: Q;

  constructor(query: Q, result: [D[], number]) {
    this.total = result[1];
    this.rows = result[0];
    this.query = query;
  }
}
