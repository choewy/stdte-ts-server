import { Module } from '@nestjs/common';

import { SignGuardStrategy } from './sign-guard.strategy';
import { SignGuard } from './sign.guard';

@Module({
  providers: [SignGuardStrategy, SignGuard],
  exports: [SignGuard],
})
export class SignGuardModule {}
