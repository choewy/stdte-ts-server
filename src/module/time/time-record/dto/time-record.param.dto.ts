import { IsNotEmpty, IsString } from 'class-validator';

export class TimeRecordParamDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
