import { IsInt, IsNotEmpty } from 'class-validator';

export class TimeMemoParamDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
