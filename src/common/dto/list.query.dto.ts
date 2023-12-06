import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class ListQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  skip?: number;
}
