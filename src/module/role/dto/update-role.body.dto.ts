import { IsArray, IsInstance, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

import { UpdateRolePolicyBodyDto } from './update-role-policy.body.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoleBodyDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiPropertyOptional({ type: UpdateRolePolicyBodyDto })
  @IsOptional()
  @IsInstance(UpdateRolePolicyBodyDto)
  rolePolicy?: UpdateRolePolicyBodyDto;

  @ApiPropertyOptional({ type: Number, isArray: true, example: [] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  users?: number[];
}
