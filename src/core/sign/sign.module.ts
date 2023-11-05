import { Module, forwardRef } from '@nestjs/common';

import { SignService } from './sign.service';
import { SignGuard } from './sign.guard';
import { SignGuardStrategy } from './sign-guard.strategy';

@Module({
  providers: [SignService, SignGuardStrategy, SignGuard],
  exports: [SignService, SignGuard],
})
export class SignModule {}
export const SignModuleRef = forwardRef(() => SignModule);
