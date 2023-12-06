import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateRoleUsersBodyDto {
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  users: number[];
}
