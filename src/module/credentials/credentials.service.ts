import { Response } from 'express';
import { DataSource } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import {
  UserCredentialsQuery,
  AlreadyUsedUserEmailException,
  InvalidPasswordException,
  UserQuery,
  InvalidCredentialsException,
  ResponseDto,
} from '@server/common';
import { CookieKey, CookieService, JwtService, JwtTokenType } from '@server/core';

import { SigninBodyDto, SignupBodyDto, UpdatePasswordBodyDto } from './dto';

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

  private removeTokensAtCookie(res: Response) {
    const cookieService = new CookieService();

    cookieService.del(res, CookieKey.Access);
    cookieService.del(res, CookieKey.Refresh);

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
      throw new InvalidCredentialsException();
    }

    if (compareSync(body.password, credentials.password) === false) {
      throw new InvalidCredentialsException();
    }

    return this.setTokensInCookie(res, credentials.id);
  }

  async signout(res: Response) {
    return this.removeTokensAtCookie(res);
  }

  async updatePassword(userId: number, body: UpdatePasswordBodyDto) {
    const credentialsQuery = new UserCredentialsQuery(this.dataSource);
    const credentials = await credentialsQuery.findUserCredentialsByUserId(userId);

    if (credentials == null) {
      throw new InvalidCredentialsException();
    }

    if (compareSync(body.currentPassword, credentials.password) === false) {
      throw new InvalidPasswordException();
    }

    if (body.newPassword !== body.confirmPassword) {
      throw new InvalidPasswordException();
    }

    await credentialsQuery.updateUserCredentialsPassword(userId, hashSync(body.newPassword, 10));

    return new ResponseDto();
  }
}
