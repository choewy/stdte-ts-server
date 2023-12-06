import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCredentialsPasswordBodyDto {
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
