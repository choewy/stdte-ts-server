import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

import { ProjectRecordType } from '../enums';

export class ProjectRecordParamDto {
  @IsNotEmpty()
  @IsEnum(ProjectRecordType)
  type: ProjectRecordType;

  @IsNotEmpty()
  @IsInt()
  id: number;
}
