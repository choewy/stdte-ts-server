import { Transform } from 'class-transformer';

import { CredentialsStatus } from '@entity';
import { CredentialsQueryFindListArgs, ListQueryDto } from '@server/common';

export class CredentialsListQueryDto extends ListQueryDto implements CredentialsQueryFindListArgs {
  @Transform(({ value }) => {
    value = Number(value);

    if (Number.isNaN(value)) {
      value = null;
    }

    return value;
  })
  status: CredentialsStatus;
}
