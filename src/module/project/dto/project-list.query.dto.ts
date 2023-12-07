import { Transform } from 'class-transformer';

import { ListQueryDto } from '@server/common';

export class ProjectListQueryDto extends ListQueryDto {
  @Transform(({ value }) => {
    value = Number(value);

    if (Number.isNaN(value)) {
      value = null;
    }

    if (value < 1) {
      value = null;
    }

    return value;
  })
  teamId: number;
}
