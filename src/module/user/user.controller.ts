import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { PolicyLevel } from '@entity';
import { SetPolicyLevel } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { UserService } from './user.service';
import { UserListQueryDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @SetPolicyLevel({ accessUser: PolicyLevel.Read })
  async getUsers(@Query() query: UserListQueryDto) {
    return this.userService.getUsers(query);
  }
}
