import { IsInt, IsNotEmpty } from 'class-validator';

export class UserParamDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
