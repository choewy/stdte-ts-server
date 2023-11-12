import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RequestUser, User } from '@server/common';
import { UseSignGuard } from '@server/core';

import { ProfileResponseDto, UpdateProfileBodyDto } from './dto';
import { ProfileService } from './profile.service';
import { ExceptionResponseDto } from '@server/dto';

@UseSignGuard()
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'get my profile' })
  @ApiOkResponse({ type: ProfileResponseDto })
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  async getMyProfile(@RequestUser() user: User): Promise<ProfileResponseDto> {
    return this.profileService.getMyProfile(user);
  }

  @Patch()
  @ApiOperation({ summary: 'update my profile' })
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  async updateMyProfile(@RequestUser() user: User, @Body() body: UpdateProfileBodyDto): Promise<void> {
    return this.profileService.updateMyProfile(user, body);
  }
}
