import { UseGuards, applyDecorators } from '@nestjs/common';

import { SetRoleGuardMetadataArgs } from './types';
import { SetRoleGuardPolicy } from './role-guard.metadata';
import { RoleGuard } from './role.guard';

export const UseRoleGuard = (setRoleGuardMetadataArgs: SetRoleGuardMetadataArgs) =>
  applyDecorators(SetRoleGuardPolicy(setRoleGuardMetadataArgs), UseGuards(RoleGuard));
