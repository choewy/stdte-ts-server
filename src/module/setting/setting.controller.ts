import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { SettingService } from './setting.service';
import { SettingUpdateBodyDto } from './dto';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  async getSetting() {
    return this.settingService.getSetting();
  }

  @Patch()
  @UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
  @SetRolePolicy({ setting: RolePolicyLevel.Update })
  async updateSetting(@Body() body: SettingUpdateBodyDto) {
    return this.settingService.updateSetting(body);
  }
}
