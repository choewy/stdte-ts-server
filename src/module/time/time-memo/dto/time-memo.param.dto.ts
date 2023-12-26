import { IsNotEmpty, IsString } from 'class-validator';

export class TimeMemoParamDto {
  @IsNotEmpty()
  @IsString()
  id: number;
}
