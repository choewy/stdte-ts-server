import { Module } from '@nestjs/common';

import { CookieModuleRef, BcryptModule, SignModuleRef } from '@server/core';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CookieModuleRef, BcryptModule, SignModuleRef],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
