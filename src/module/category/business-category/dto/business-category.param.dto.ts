import { IsInt, IsNotEmpty } from 'class-validator';

export class BusinessCategoryParamDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
