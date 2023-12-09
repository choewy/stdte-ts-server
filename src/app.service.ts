import { Injectable } from '@nestjs/common';

import { AppConfig } from './config';

@Injectable()
export class AppService {
  getVersion() {
    return { version: new AppConfig().getVersion() };
  }
}
