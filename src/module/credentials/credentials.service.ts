import { Response } from 'express';
import { DataSource } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import {
  UserCredentialsQuery,
  AlreadyUsedUserEmailException,
  InvalidPasswordException,
  UserQuery,
  InvalidUserCredentialsException,
  ResponseDto,
} from '@server/common';
import { CookieKey, CookieService, JwtService, JwtTokenType } from '@server/core';

import { SigninBodyDto, SignupBodyDto } from './dto';

@Injectable()
export class CredentialsService {
  constructor(private readonly dataSource: DataSource) {}

  private setTokensInCookie(res: Response, id: number) {
    const cookieService = new CookieService();
    const jwtService = new JwtService();

    cookieService.set(res, CookieKey.Access, jwtService.issue(JwtTokenType.Access, { id }));
    cookieService.set(res, CookieKey.Refresh, jwtService.issue(JwtTokenType.Access, { id }));

    res.send(new ResponseDto());
  }

  async signup(res: Response, body: SignupBodyDto) {
    const has = await new UserCredentialsQuery(this.dataSource).hasUserCredentialsByEmail(body.email);

    if (has === true) {
      throw new AlreadyUsedUserEmailException();
    }

    if (body.password !== body.confirmPassword) {
      throw new InvalidPasswordException();
    }

    const credentials = await this.dataSource.transaction(async (em) => {
      return await new UserCredentialsQuery(em).insertUserCredentials({
        user: await new UserQuery(em).saveUser({ name: body.name }),
        email: body.email,
        password: hashSync(body.password, 10),
      });
    });

    return this.setTokensInCookie(res, credentials.id);
  }

  async signin(res: Response, body: SigninBodyDto) {
    const credentials = await new UserCredentialsQuery(this.dataSource).findUserCredentialsByEmail(body.email);

    if (credentials == null) {
      throw new InvalidUserCredentialsException();
    }

    if (compareSync(body.password, credentials.password) === false) {
      throw new InvalidUserCredentialsException();
    }

    return this.setTokensInCookie(res, credentials.id);
  }
}
