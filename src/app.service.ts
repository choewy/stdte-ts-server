import { Injectable } from '@nestjs/common';

import { AppConfig } from './config';
import { ResponseDto } from './common';

@Injectable()
export class AppService {
  private readonly appConfig = new AppConfig();

  getVersion() {
    return new ResponseDto({ version: this.appConfig.getVersion() });
  }
}
