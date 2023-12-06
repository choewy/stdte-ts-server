import { IsNotEmpty, IsString } from 'class-validator';

export class SigninBodyDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
