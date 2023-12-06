import { Response } from 'express';

import { Body, Controller, Post, Res } from '@nestjs/common';

import { CredentialsService } from './credentials.service';
import { SigninBodyDto, SignupBodyDto } from './dto';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post('signup')
  async signup(@Res() res: Response, @Body() body: SignupBodyDto) {
    await this.credentialsService.signup(res, body);
  }

  @Post('signin')
  async signin(@Res() res: Response, @Body() body: SigninBodyDto) {
    await this.credentialsService.signin(res, body);
  }
}
