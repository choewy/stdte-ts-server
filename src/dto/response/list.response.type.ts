import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export const ListResponseType = <D, Q>(Row: Type<D>, Query: Type<Q>) => {
  class ListType {
    @ApiResponseProperty({ type: Number })
    total: number;

    @ApiResponseProperty({ type: [Row] })
    rows: D[];

    @ApiResponseProperty({ type: Query })
    query: Q;

    constructor(total: number, rows: D[], query: Q) {
      this.total = total;
      this.rows = rows;
      this.query = query;
    }
  }

  return ListType;
};
