import { ApiResponseProperty } from '@nestjs/swagger';

import { ROLE_POLICY_SCOPE_TEXTS, RolePolicy } from '@server/common';
import { EnumMapResponseDto } from '@server/dto';

export class RolePolicyResponseDto {
  @ApiResponseProperty({ type: EnumMapResponseDto })
  accessRole: EnumMapResponseDto;

  @ApiResponseProperty({ type: EnumMapResponseDto })
  accessTeam: EnumMapResponseDto;

  @ApiResponseProperty({ type: EnumMapResponseDto })
  accessUser: EnumMapResponseDto;

  @ApiResponseProperty({ type: EnumMapResponseDto })
  accessProject: EnumMapResponseDto;

  constructor(rolePolicy: RolePolicy) {
    this.accessRole = new EnumMapResponseDto(rolePolicy.accessRole, ROLE_POLICY_SCOPE_TEXTS);
    this.accessTeam = new EnumMapResponseDto(rolePolicy.accessTeam, ROLE_POLICY_SCOPE_TEXTS);
    this.accessUser = new EnumMapResponseDto(rolePolicy.accessUser, ROLE_POLICY_SCOPE_TEXTS);
    this.accessProject = new EnumMapResponseDto(rolePolicy.accessProject, ROLE_POLICY_SCOPE_TEXTS);
  }
}
