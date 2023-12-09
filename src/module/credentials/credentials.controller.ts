import { Response } from 'express';

import { Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';

import { RolePolicyLevel } from '@entity';
import { ReqUserID, Request, SetRolePolicy } from '@server/common';
import { CredentialsGuard, JwtGuard, RoleGuard } from '@server/core';

import { CredentialsService } from './credentials.service';
import {
  CredentialsParamDto,
  SigninBodyDto,
  SignupBodyDto,
  UpdateCredentialsPasswordBodyDto,
  UpdateCredentialsStatusBodyDto,
  UpdatePasswordBodyDto,
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

  @Patch('password')
  @UseGuards(JwtGuard)
  async updateMyPassword(@ReqUserID() userId: number, @Body() body: UpdatePasswordBodyDto) {
    return this.credentialsService.updateMyPassword(userId, body);
  }

  @Patch(':id(\\d+)/status')
  @SetRolePolicy({ credentials: RolePolicyLevel.Update })
  @UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
  async updateCredentialsStatus(@Param() param: CredentialsParamDto, @Body() body: UpdateCredentialsStatusBodyDto) {
    return this.credentialsService.updateCredentialsStatus(param.id, body);
  }

  @Patch(':id(\\d+)/password')
  @SetRolePolicy({ credentials: RolePolicyLevel.Update })
  @UseGuards(JwtGuard, CredentialsGuard, RoleGuard)
  async updateCredentialsPassword(@Param() param: CredentialsParamDto, @Body() body: UpdateCredentialsPasswordBodyDto) {
    return this.credentialsService.updateCredentialsPassword(param.id, body);
  }
}
