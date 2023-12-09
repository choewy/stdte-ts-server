import { IsEnum, IsNotEmpty } from 'class-validator';

import { CredentialsStatus } from '@entity';

export class CredentialsUpdateStatusBodyDto {
  @IsNotEmpty()
  @IsEnum(CredentialsStatus)
  status: CredentialsStatus;
}
