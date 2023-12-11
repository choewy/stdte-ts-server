import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { Request, SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { UserService } from './user.service';
import { UserListQueryDto, UserParamDto, UserUpdateBodyDto } from './dto';

@UseGuards(JwtGuard, CredentialsGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RoleGuard)
  @SetRolePolicy({ user: RolePolicyLevel.Read })
  async getUsers(@Query() query: UserListQueryDto) {
    return this.userService.getUsers(query);
  }

  @Get(':id(\\d+)')
  @UseGuards(RoleGuard)
  @SetRolePolicy({ user: RolePolicyLevel.Read })
  async getUser(@Param() param: UserParamDto) {
    return this.userService.getUser(param.id);
  }

  @Patch(':id(\\d+)')
  @UseGuards(RoleGuard)
  @SetRolePolicy({ user: RolePolicyLevel.Update })
  async updateUser(@Param() param: UserParamDto, @Body() body: UserUpdateBodyDto) {
    return this.userService.updateUser(param.id, body);
  }

  @Get('profile')
  async getMyProfile(@Req() req: Request) {
    return this.userService.getUser(req.userId);
  }

  @Patch('profile')
  async updateMyProfile(@Req() req: Request, @Body() body: UserUpdateBodyDto) {
    return this.userService.updateUser(req.userId, body);
  }
}
