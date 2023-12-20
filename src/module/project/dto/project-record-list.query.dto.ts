import { IsEnum, IsNotEmpty } from 'class-validator';

import { ListQueryDto } from '@server/common';

import { ProjectRecordType } from '../enums';

export class ProjectRecordListQueryDto extends ListQueryDto {
  @IsNotEmpty()
  @IsEnum(ProjectRecordType)
  type: ProjectRecordType;
}
