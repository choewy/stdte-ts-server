import { Credentials, CredentialsStatus } from '@entity';

export class UserCredentialsDto {
  email: string;
  status: CredentialsStatus;

  constructor(credentials: Credentials) {
    this.email = credentials.email;
    this.status = credentials.status;
  }
}
