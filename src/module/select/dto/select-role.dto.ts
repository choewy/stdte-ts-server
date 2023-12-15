import { Role } from '@entity';

import { SelectDto } from './select.dto';

export class SelectRoleDto extends SelectDto {
  constructor(role: Role) {
    super(role.id, role.name);
  }
}
