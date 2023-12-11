import { Credentials, CredentialsStatus } from '@entity';

import { toISOString } from '@server/common';

export class CredentialsDto {
  email: string;
  status: CredentialsStatus;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(credentials: Credentials) {
    this.email = credentials.email;
    this.status = credentials.status;
    this.createdAt = toISOString(credentials.createdAt);
    this.updatedAt = toISOString(credentials.createdAt);
  }
}
