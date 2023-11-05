import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class SignUpBodyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsBoolean()
  withTokens?: boolean;
}
