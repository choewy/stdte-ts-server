import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { toTrim } from '@server/common';

export class SigninBodyDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
