import { Response } from 'express';

import { Body, Controller, Post, Res } from '@nestjs/common';

import { SignInBodyDto, SignUpBodyDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
