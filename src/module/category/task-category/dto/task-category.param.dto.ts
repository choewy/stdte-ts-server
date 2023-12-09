import { IsInt, IsNotEmpty } from 'class-validator';

export class TaskCategoryParamDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
