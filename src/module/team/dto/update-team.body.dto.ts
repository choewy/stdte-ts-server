import { IsArray, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateTeamBodyDto {
  @IsOptional()
  @IsString()
  @Length(50)
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  leaderId?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  memberIds?: number[];
}
