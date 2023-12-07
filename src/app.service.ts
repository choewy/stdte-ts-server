import { Injectable } from '@nestjs/common';

import { ResponseDto } from './common';
import { AppConfig } from './config';

@Injectable()
export class AppService {
  private readonly appConfig = new AppConfig();

  getVersion() {
    return new ResponseDto({ version: this.appConfig.getVersion() });
  }
}
