import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { toTrim } from '@server/common';

export class SignupBodyDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => toTrim(value))
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
