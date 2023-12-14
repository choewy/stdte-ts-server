import { CredentialsStatus } from '@entity';

export const CREDENTIALS_STATUS_VALUES = Object.values(CredentialsStatus)
  .filter((status) => typeof status === 'number')
  .sort() as CredentialsStatus[];
