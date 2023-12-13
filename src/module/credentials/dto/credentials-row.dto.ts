import { Credentials, CredentialsStatus } from '@entity';
import { toISOString } from '@server/common';

export class CredentialsRowDto {
  id: number;
  email: string;
  name: string;
  status: CredentialsStatus;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(credentials: Credentials) {
    this.id = credentials.id;
    this.name = credentials.user.name;
    this.email = credentials.email;
    this.status = credentials.status;
    this.createdAt = toISOString(credentials.createdAt);
    this.updatedAt = toISOString(credentials.updatedAt);
  }
}
