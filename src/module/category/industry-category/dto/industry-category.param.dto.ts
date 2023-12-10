import { IsInt, IsNotEmpty } from 'class-validator';

export class IndustryCategoryParamDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
