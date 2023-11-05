import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtConfig } from '@server/common';

import { CookieModuleRef } from '../cookie';

import { SignService } from './sign.service';
import { SignGuard } from './sign.guard';
import { SignGuardStrategy } from './sign-guard.strategy';

@Module({
  imports: [CookieModuleRef, JwtModule.register(new JwtConfig().getJwtModuleOptions())],
  providers: [SignService, SignGuardStrategy, SignGuard],
  exports: [SignService, SignGuard],
})
export class SignModule {}
export const SignModuleRef = forwardRef(() => SignModule);
