import { Response } from 'express';

import { Body, Controller, Get, Post, Res, UseFilters, UseGuards } from '@nestjs/common';

import { SignGuard } from '@server/core';

import { AuthResponseDto, SignInBodyDto, SignUpBodyDto } from './dto';
import { AuthIgnoreExceptionFilter } from './auth-ignore-exception.filter';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(SignGuard)
  @UseFilters(AuthIgnoreExceptionFilter)
  async auth(): Promise<AuthResponseDto> {
    return new AuthResponseDto(true);
  }

  @Post('signin')
  async signin(@Res() response: Response, @Body() body: SignInBodyDto) {
    return this.authService.signin(response, body);
  }

  @Post('signup')
  async signup(@Res() response: Response, @Body() body: SignUpBodyDto) {
    return this.authService.signup(response, body);
  }

  @Post('signout')
  async signout(@Res() response: Response) {
    return this.authService.signout(response);
  }
}
