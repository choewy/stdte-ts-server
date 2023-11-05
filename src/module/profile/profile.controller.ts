import { Controller, Get, UseGuards } from '@nestjs/common';

import { SignGuard } from '@server/core';

import { ProfileService } from './profile.service';

@UseGuards(SignGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getMyProfile() {
    return;
  }
}
