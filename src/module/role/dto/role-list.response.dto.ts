import { ListQueryDto, ListResponseType } from '@server/common';

import { RoleResponseDto } from './role.response.dto';

export class RoleListResponseDto extends ListResponseType(RoleResponseDto, ListQueryDto) {}
