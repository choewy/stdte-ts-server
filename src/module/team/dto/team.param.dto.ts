import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class TeamParamDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
