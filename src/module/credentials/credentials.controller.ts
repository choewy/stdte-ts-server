import { Response } from 'express';

import { Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { Request, SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { CredentialsService } from './credentials.service';
import {
  CredentialsParamDto,
  SigninBodyDto,
  SignupBodyDto,
  PasswordUpdateBodyDto,
  CredentialsUpdateStatusBodyDto,
  CredentialsUpdatePasswordBodyDto,
} from './dto';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getMyCredentials(@Req() req: Request) {
    return this.credentialsService.getMyCredentials(req.userId);
  }

  @Post('signup')
  async signup(@Req() req: Request, @Res() res: Response, @Body() body: SignupBodyDto) {
    return this.credentialsService.signup(req, res, body);
  }

  @Post('signin')
  async signin(@Req() req: Request, @Res() res: Response, @Body() body: SigninBodyDto) {
    return this.credentialsService.signin(req, res, body);
  }

  @Post('signout')
  async signout(@Req() req: Request, @Res() res: Response) {
    return this.credentialsService.signout(req, res);
  }

  @Patch('password')
  @UseGuards(JwtGuard)
  async updatePassword(@Req() req: Request, @Body() body: PasswordUpdateBodyDto) {
    return this.credentialsService.updatePassword(req.userId, body);
  }

  @Patch(':id(\\d+)/status')
  @UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
  @SetRolePolicy({ credentials: RolePolicyLevel.Update })
  async updateCredentialsStatus(@Param() param: CredentialsParamDto, @Body() body: CredentialsUpdateStatusBodyDto) {
    return this.credentialsService.updateCredentialsStatus(param.id, body);
  }

  @Patch(':id(\\d+)/password')
  @UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
  @SetRolePolicy({ credentials: RolePolicyLevel.Update })
  async updateCredentialsPassword(@Param() param: CredentialsParamDto, @Body() body: CredentialsUpdatePasswordBodyDto) {
    return this.credentialsService.updateCredentialsPassword(param.id, body);
  }
}
