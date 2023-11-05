import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { RequestUserID } from '@server/common';
import { SignGuard } from '@server/core';

import { ProfileResponseDto, UpdateProfileBodyDto } from './dto';
import { ProfileService } from './profile.service';

@UseGuards(SignGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getMyProfile(@RequestUserID() userId: number): Promise<ProfileResponseDto> {
    return this.profileService.getMyProfile(userId);
  }

  @Patch()
  async updateMyProfile(@RequestUserID() userId: number, @Body() body: UpdateProfileBodyDto) {
    return this.profileService.updateMyProfile(userId, body);
  }
}
