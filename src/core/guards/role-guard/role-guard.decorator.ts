import { Type, UseGuards, applyDecorators } from '@nestjs/common';

import { SetRoleGuardMetadataArgs } from './types';
import { SetRoleGuardPolicy } from './role-guard.metadata';
import { RoleGuard } from './role.guard';

export const UseRoleGuard = (setRoleGuardMetadataArgs?: SetRoleGuardMetadataArgs, ...beforeGuards: Type<any>[]) =>
  applyDecorators(SetRoleGuardPolicy(setRoleGuardMetadataArgs), UseGuards(...beforeGuards, RoleGuard));
