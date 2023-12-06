import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class RoleParamDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
