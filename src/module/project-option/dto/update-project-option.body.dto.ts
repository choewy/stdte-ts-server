import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateProjectOptionBodyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  projectTypeId?: number;
}
