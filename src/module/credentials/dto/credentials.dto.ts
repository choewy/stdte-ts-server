import { CredentialsStatus, User } from '@entity';

import { toISOString } from '@server/common';
import { CredentialsRoleDto } from './credentials-role.dto';

export class CredentialsDto {
  id: number;
  name: string;
  email: string;
  status: CredentialsStatus;
  role: CredentialsRoleDto | null;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.credentials.email;
    this.status = user.credentials.status;
    this.role = user.role ? new CredentialsRoleDto(user.role) : null;
    this.createdAt = toISOString(user.credentials.createdAt);
    this.updatedAt = toISOString(user.credentials.updatedAt);
  }
}
