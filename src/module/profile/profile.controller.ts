import { Body, Controller, Get, Patch } from '@nestjs/common';

import { RequestUserID } from '@server/common';
import { UseSignGuard } from '@server/core';

import { ProfileResponseDto, UpdateProfileBodyDto } from './dto';
import { ProfileService } from './profile.service';

@UseSignGuard()
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
