import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { ReqUserID } from '@server/common';
import { JwtGuard } from '@server/core';

import { ProfileService } from './profile.service';
import { UpdateMyProfileBodyDto } from './dto';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getMyProfile(@ReqUserID() userId: number) {
    return this.profileService.getMyProfile(userId);
  }

  @Patch()
  async updateMyProfile(@ReqUserID() userId: number, @Body() body: UpdateMyProfileBodyDto) {
    return this.profileService.updateMyProfile(userId, body);
  }
}
