import { IsOptional, IsString } from 'class-validator';

export class UpdateProjectTypeBodyDto {
  @IsOptional()
  @IsString()
  name?: string;
}
