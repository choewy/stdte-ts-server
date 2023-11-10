import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordBodyDto {
  @ApiProperty({ type: String, example: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @ApiProperty({ type: String, example: 'p@5SW0rd' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({ type: String, example: 'p@5SW0rd' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
