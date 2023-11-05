import { Module, forwardRef } from '@nestjs/common';

import { CookieService } from './cookie.service';

@Module({
  providers: [CookieService],
  exports: [CookieService],
})
export class CookieModule {}
export const CookieModuleRef = forwardRef(() => CookieModule);
