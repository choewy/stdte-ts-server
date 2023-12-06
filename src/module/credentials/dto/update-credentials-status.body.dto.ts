import { IsEnum, IsNotEmpty } from 'class-validator';

import { CredentialStatus } from '@entity';

export class UpdateCredentialsStatusBodyDto {
  @IsNotEmpty()
  @IsEnum(CredentialStatus)
  status: CredentialStatus;
}
