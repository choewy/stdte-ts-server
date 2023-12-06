import { Response } from 'express';

import { Body, Controller, Get, Patch, Post, Res, UseGuards } from '@nestjs/common';

import { ReqUserID } from '@server/common';
import { JwtGuard } from '@server/core';

import { CredentialsService } from './credentials.service';
import { SigninBodyDto, SignupBodyDto, UpdatePasswordBodyDto } from './dto';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getMyCredentials(@ReqUserID() userId: number) {
    return this.credentialsService.getMyCredentials(userId);
  }

  @Post('signup')
  async signup(@Res() res: Response, @Body() body: SignupBodyDto) {
    return this.credentialsService.signup(res, body);
  }

  @Post('signin')
  async signin(@Res() res: Response, @Body() body: SigninBodyDto) {
    return this.credentialsService.signin(res, body);
  }

  @Post('signout')
  async signout(@Res() res: Response) {
    return this.credentialsService.signout(res);
  }

  @UseGuards(JwtGuard)
  @Patch('password')
  async updatePassword(@ReqUserID() userId: number, @Body() body: UpdatePasswordBodyDto) {
    return this.credentialsService.updatePassword(userId, body);
  }
}
