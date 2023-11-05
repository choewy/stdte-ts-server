import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class GetRoleParamDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
