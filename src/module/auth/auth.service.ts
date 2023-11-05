import { DataSource } from 'typeorm';

import { HttpStatus, Injectable } from '@nestjs/common';

import {
  User,
  UserQuery,
  AlreadyExistUserException,
  SignInFailException,
  NotSamePasswordException,
  CookieKey,
} from '@server/common';
import { CookieService, BcryptService, SignService } from '@server/core';

import { SignInBodyDto, SignResponseDto, SignUpBodyDto } from './dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly cookieService: CookieService,
    private readonly bcryptService: BcryptService,
    private readonly signService: SignService,
  ) {}

  private responseWithTokens(response: Response, user: User, withTokens = false): Response {
    const access = this.signService.issueAccess(user);
    const refresh = this.signService.issueRefresh(user);

    this.cookieService.set(response, CookieKey.Access, access);
    this.cookieService.set(response, CookieKey.Refresh, refresh);

    return response.status(HttpStatus.CREATED).send(new SignResponseDto(user, access, refresh, withTokens));
  }

  async signin(response: Response, body: SignInBodyDto): Promise<Response> {
    const userQuery = UserQuery.withDataSource(User, this.dataSource);
    const user = await userQuery.findUserByEmail(body.email);

    if (user === null) {
      throw new SignInFailException();
    }

    return this.responseWithTokens(response, user, body.withTokens);
  }

  async signup(response: Response, body: SignUpBodyDto): Promise<Response> {
    const userQuery = UserQuery.withDataSource(User, this.dataSource);
    const userExist = await userQuery.hasUserByEmail(body.email);

    if (userExist) {
      throw new AlreadyExistUserException();
    }

    if (body.password !== body.confirmPassword) {
      throw new NotSamePasswordException();
    }

    const user = await userQuery.createUser({
      name: body.name,
      email: body.email,
      password: this.bcryptService.encryptPassword(body.password),
    });

    return this.responseWithTokens(response, user, body.withTokens);
  }

  async signout(response: Response): Promise<Response> {
    this.cookieService.delete(response, CookieKey.Access);
    this.cookieService.delete(response, CookieKey.Refresh);

    return response.sendStatus(HttpStatus.OK);
  }
}
