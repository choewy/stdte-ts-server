import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateTeamBodyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  leader?: number;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  members?: number[];
}
