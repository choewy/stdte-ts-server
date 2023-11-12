import { Response } from 'express';

import { Body, Controller, Get, Patch, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RequestUser, User } from '@server/common';
import { SignGuard, UseRoleGuard, UseSignGuard } from '@server/core';
import { RequestUserResponseDto } from '@server/dto';

import { SignInBodyDto, SignUpBodyDto, UpdatePasswordBodyDto } from './dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseRoleGuard({}, SignGuard)
  @ApiOperation({ summary: 'auth check' })
  @ApiOkResponse({ type: RequestUserResponseDto })
  async auth(@RequestUser() user: User): Promise<RequestUserResponseDto> {
    return new RequestUserResponseDto(user);
  }

  @Patch()
  @UseSignGuard()
  @ApiOperation({ summary: 'update my password' })
  @ApiOkResponse()
  async updateMyPassword(@RequestUser() user: User, @Body() body: UpdatePasswordBodyDto): Promise<void> {
    return this.authService.updateMyPassword(user, body);
  }

  @Post('signin')
  @ApiOperation({ summary: 'signin' })
  @ApiCreatedResponse({ type: RequestUserResponseDto })
  async signin(@Res() response: Response, @Body() body: SignInBodyDto): Promise<Response> {
    return this.authService.signin(response, body);
  }

  @Post('signup')
  @ApiOperation({ summary: 'signup' })
  @ApiCreatedResponse({ type: RequestUserResponseDto })
  async signup(@Res() response: Response, @Body() body: SignUpBodyDto): Promise<Response> {
    return this.authService.signup(response, body);
  }

  @Post('signout')
  @ApiOperation({ summary: 'signout' })
  @ApiOkResponse()
  async signout(@Res() response: Response): Promise<Response> {
    return this.authService.signout(response);
  }
}
