import { Controller, Post } from '@nestjs/common';

import { CredentialsService } from './credentials.service';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post('signup')
  async signup() {
    return;
  }

  @Post('signin')
  async signin() {
    return;
  }
}
