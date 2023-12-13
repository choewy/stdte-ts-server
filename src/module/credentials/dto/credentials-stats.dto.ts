import { CredentialsStatus } from '@entity';

export class CredentialsStatsDto {
  status: CredentialsStatus;
  count: number;

  constructor(status: CredentialsStatus, count: string | number) {
    this.status = status;
    this.count = Number(count);
  }
}
