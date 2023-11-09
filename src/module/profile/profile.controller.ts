import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ExceptionResponseDto, RequestUserID } from '@server/common';
import { UseSignGuard } from '@server/core';

import { ProfileResponseDto, UpdateProfileBodyDto } from './dto';
import { ProfileService } from './profile.service';

@UseSignGuard()
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'get my profile' })
  @ApiOkResponse({ type: ProfileResponseDto })
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  async getMyProfile(@RequestUserID() userId: number): Promise<ProfileResponseDto> {
    return this.profileService.getMyProfile(userId);
  }

  @Patch()
  @ApiOperation({ summary: 'update my profile' })
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  async updateMyProfile(@RequestUserID() userId: number, @Body() body: UpdateProfileBodyDto): Promise<void> {
    return this.profileService.updateMyProfile(userId, body);
  }
}
