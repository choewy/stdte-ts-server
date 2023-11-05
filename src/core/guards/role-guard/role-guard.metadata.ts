import { SetMetadata } from '@nestjs/common';

import { SetRoleGuardMetadataArgs } from './types';
import { RoleGuard } from './role.guard';

export const SetRoleGuardPolicy = (rolePolicy: SetRoleGuardMetadataArgs) => SetMetadata(RoleGuard.name, rolePolicy);
