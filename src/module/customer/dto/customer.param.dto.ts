import { IsInt, IsNotEmpty } from 'class-validator';

export class CustomerParamDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
