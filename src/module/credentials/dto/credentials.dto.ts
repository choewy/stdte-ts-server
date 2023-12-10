import { Credentials, CredentialsStatus } from '@entity';

import { toISO } from '@server/common';

export class CredentialsDto {
  email: string;
  status: CredentialsStatus;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(credentials: Credentials) {
    this.email = credentials.email;
    this.status = credentials.status;
    this.createdAt = toISO(credentials.createdAt);
    this.updatedAt = toISO(credentials.createdAt);
  }
}
