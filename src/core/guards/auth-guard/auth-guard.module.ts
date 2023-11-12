import { Module } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthGuardStrategy } from './auth-guard.strategy';

@Module({
  providers: [AuthGuardStrategy, AuthGuard],
  exports: [AuthGuard],
})
export class AuthGuardModule {}
