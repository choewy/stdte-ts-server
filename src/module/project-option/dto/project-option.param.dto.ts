import { IsInt, IsNotEmpty } from 'class-validator';

export class ProjectOptionParamDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
