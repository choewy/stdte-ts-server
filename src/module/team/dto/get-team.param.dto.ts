import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class GetTeamParamDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
