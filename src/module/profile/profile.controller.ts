import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';

import { Request } from '@server/common';
import { JwtGuard } from '@server/core';

import { ProfileService } from './profile.service';
import { ProfileUpdateBodyDto } from './dto';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Req() req: Request) {
    return this.profileService.getProfile(req.userId);
  }

  @Patch()
  async updateProfile(@Req() req: Request, @Body() body: ProfileUpdateBodyDto) {
    return this.profileService.updateProfile(req.userId, body);
  }
}
