import { Transform } from 'class-transformer';

import { QueryGetListArgs } from '../query';

export class ListQueryDto implements QueryGetListArgs {
  @Transform(({ value }) => {
    value = Number(value);

    if (Number.isNaN(value)) {
      value = 10;
    }

    if (value === 0) {
      value = 10;
    }

    return value;
  })
  take: number = 10;

  @Transform(({ value }) => {
    value = Number(value);

    if (Number.isNaN(value)) {
      value = 0;
    }

    return value;
  })
  skip: number = 0;
}
