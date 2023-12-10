import { Setting } from '@entity';

export class SettingDto {
  difficultyTooltip: string;

  constructor(setting: Setting | null) {
    this.difficultyTooltip = setting?.difficultyTooltip ?? '';
  }
}
