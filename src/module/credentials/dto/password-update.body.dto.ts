import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordUpdateBodyDto {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
