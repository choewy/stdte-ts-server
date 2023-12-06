import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CredentialsParamDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
