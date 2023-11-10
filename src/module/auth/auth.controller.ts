import { Response } from 'express';

import { Body, Controller, Get, Patch, Post, Res, UseFilters } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RequestUserID, RequestUserEmail } from '@server/common';
import { UseSignGuard } from '@server/core';

import { AuthResponseDto, SignInBodyDto, SignResponseDto, SignUpBodyDto, UpdatePasswordBodyDto } from './dto';
import { AuthIgnoreExceptionFilter } from './auth-ignore-exception.filter';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseSignGuard()
  @UseFilters(AuthIgnoreExceptionFilter)
  @ApiOperation({ summary: 'auth check' })
  @ApiOkResponse({ type: AuthResponseDto })
  async auth(): Promise<AuthResponseDto> {
    return new AuthResponseDto(true);
  }

  @Patch()
  @UseSignGuard()
  @ApiOperation({ summary: 'update my password' })
  @ApiOkResponse()
  async updateMyPassword(
    @RequestUserID() id: number,
    @RequestUserEmail() email: string,
    @Body() body: UpdatePasswordBodyDto,
  ): Promise<void> {
    return this.authService.updateMyPassword(id, email, body);
  }

  @Post('signin')
  @ApiOperation({ summary: 'signin' })
  @ApiCreatedResponse({ type: SignResponseDto })
  async signin(@Res() response: Response, @Body() body: SignInBodyDto): Promise<Response> {
    return this.authService.signin(response, body);
  }

  @Post('signup')
  @ApiOperation({ summary: 'signup' })
  @ApiCreatedResponse({ type: SignResponseDto })
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
