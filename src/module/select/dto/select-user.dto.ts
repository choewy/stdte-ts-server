import { User } from '@entity';

import { SelectDto } from './select.dto';

export class SelectUserDto extends SelectDto {
  constructor(user: User) {
    super(user.id, user.name, user.role?.name);
  }
}
