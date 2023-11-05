import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtConfig } from '@server/common';

import { SignService } from './sign.service';

@Module({
  imports: [JwtModule.register(new JwtConfig().getJwtModuleOptions())],
  providers: [SignService],
  exports: [SignService],
})
export class SignModule {}
export const SignModuleRef = forwardRef(() => SignModule);
