import { Injectable } from '@nestjs/common';

import { VersionConfig } from '@server/common';

@Injectable()
export class AppService {
  private readonly versionConfig = new VersionConfig();

  getVersion(): string {
    return this.versionConfig.getVersion();
  }
}
