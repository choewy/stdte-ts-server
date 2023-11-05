import { Module } from '@nestjs/common';

import { SignModuleRef } from '@server/core';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [SignModuleRef],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
