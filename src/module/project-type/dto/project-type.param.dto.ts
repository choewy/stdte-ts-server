import { IsInt, IsNotEmpty } from 'class-validator';

export class ProjectTypeParamDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
