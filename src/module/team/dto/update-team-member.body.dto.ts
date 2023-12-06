import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateTeamMembersBodyDto {
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  members: number[];
}
