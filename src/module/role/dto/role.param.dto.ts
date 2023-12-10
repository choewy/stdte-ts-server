import { IsInt, IsNotEmpty } from 'class-validator';

export class RoleParamDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
