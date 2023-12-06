import { IsEnum, IsNotEmpty } from 'class-validator';

import { CredentialsStatus } from '@entity';

export class UpdateCredentialsStatusBodyDto {
  @IsNotEmpty()
  @IsEnum(CredentialsStatus)
  status: CredentialsStatus;
}
