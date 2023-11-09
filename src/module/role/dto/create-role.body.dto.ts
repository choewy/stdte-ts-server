import { IsArray, IsInstance, IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { CreateRolePolicyBodyDto } from './create-role-policy.body.dto';

export class CreateRoleBodyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ type: CreateRolePolicyBodyDto })
  @IsNotEmpty()
  @IsInstance(CreateRolePolicyBodyDto)
  rolePolicy: CreateRolePolicyBodyDto;

  @ApiProperty({ type: Number, isArray: true, example: [] })
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  users: number[];
}
