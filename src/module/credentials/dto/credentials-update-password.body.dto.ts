import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialsUpdatePasswordBodyDto {
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
