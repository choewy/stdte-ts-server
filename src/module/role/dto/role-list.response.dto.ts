import { ListQueryDto, ListResponseType } from '@server/dto';

import { RoleResponseDto } from './role.response.dto';

export class RoleListResponseDto extends ListResponseType(RoleResponseDto, ListQueryDto) {}
