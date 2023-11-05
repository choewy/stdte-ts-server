import { Module } from '@nestjs/common';

import { SignGuard } from './sign.guard';
import { SignGuardStrategy } from './sign-guard.strategy';

@Module({
  providers: [SignGuardStrategy, SignGuard],
  exports: [SignGuard],
})
export class SignModule {}
