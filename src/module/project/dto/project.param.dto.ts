import { IsInt, IsNotEmpty } from 'class-validator';

export class ProjectParamDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
