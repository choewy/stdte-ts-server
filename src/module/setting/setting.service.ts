import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { SettingQuery } from '@server/common';

import { SettingDto, SettingUpdateBodyDto } from './dto';

@Injectable()
export class SettingService {
  constructor(private readonly dataSource: DataSource) {}

  async getSetting() {
    const settingQuery = new SettingQuery(this.dataSource);
    const setting = await settingQuery.findSetting();

    return new SettingDto(setting);
  }

  async updateSetting(body: SettingUpdateBodyDto) {
    const settingQuery = new SettingQuery(this.dataSource);
    await settingQuery.updateSetting(body);
  }
}
