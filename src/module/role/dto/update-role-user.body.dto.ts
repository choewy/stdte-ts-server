import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateRoleUserBodyDto {
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  users: number[];
}
