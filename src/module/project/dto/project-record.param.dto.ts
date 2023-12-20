import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

import { ProjectRecordType } from '../enums';

export class ProjectRecordParamDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsEnum(ProjectRecordType)
  type: ProjectRecordType;
}
