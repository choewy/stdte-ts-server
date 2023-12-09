import { Response } from 'express';
import { DataSource } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import {
  CredentialsQuery,
  AlreadyExistUserEmailException,
  InvalidPasswordException,
  UserQuery,
  InvalidCredentialsException,
  NotFoundCredentialsException,
} from '@server/common';
import { CookieKey, CookieService, JwtService, JwtTokenType } from '@server/core';

import {
  SigninBodyDto,
  SignupBodyDto,
  UpdateCredentialsPasswordBodyDto,
  UpdateCredentialsStatusBodyDto,
  UpdatePasswordBodyDto,
} from './dto';

@Injectable()
export class CredentialsService {
  constructor(private readonly dataSource: DataSource) {}

  private setTokensInCookie(res: Response, id: number) {
    const cookieService = new CookieService();
    const jwtService = new JwtService();

    cookieService.set(res, CookieKey.Access, jwtService.issue(JwtTokenType.Access, { id }));
    cookieService.set(res, CookieKey.Refresh, jwtService.issue(JwtTokenType.Access, { id }));

    res.send();
  }

  private removeTokensAtCookie(res: Response) {
    const cookieService = new CookieService();

    cookieService.delete(res, CookieKey.Access);
    cookieService.delete(res, CookieKey.Refresh);

    res.send();
  }

  async getMyCredentials(userId: number) {
    const credentials = await new CredentialsQuery(this.dataSource).findCredentialsByUserId(userId);

    if (credentials == null) {
      throw new InvalidCredentialsException();
    }

    return {
      email: credentials.email,
      status: credentials.status,
      createdAt: credentials.createdAt,
    };
  }

  async signup(res: Response, body: SignupBodyDto) {
    const has = await new CredentialsQuery(this.dataSource).hasCredentialsByEmail(body.email);

    if (has === true) {
      throw new AlreadyExistUserEmailException();
    }

    if (body.password !== body.confirmPassword) {
      throw new InvalidPasswordException();
    }

    const credentials = await this.dataSource.transaction(async (em) =>
      new CredentialsQuery(em).insertCredentials({
        user: await new UserQuery(em).saveUser({ name: body.name }),
        email: body.email,
        password: hashSync(body.password, 10),
      }),
    );

    return this.setTokensInCookie(res, credentials.id);
  }

  async signin(res: Response, body: SigninBodyDto) {
    const credentials = await new CredentialsQuery(this.dataSource).findCredentialsByEmail(body.email);

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

  async updateMyPassword(userId: number, body: UpdatePasswordBodyDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);
    const credentials = await credentialsQuery.findCredentialsByUserId(userId);

    if (credentials == null) {
      throw new InvalidCredentialsException();
    }

    if (compareSync(body.currentPassword, credentials.password) === false) {
      throw new InvalidPasswordException();
    }

    if (body.newPassword !== body.confirmPassword) {
      throw new InvalidPasswordException();
    }

    await credentialsQuery.updateCredentialsPassword(userId, hashSync(body.newPassword, 10));
  }

  async updateCredentialsStatus(id: number, body: UpdateCredentialsStatusBodyDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);

    const has = await credentialsQuery.hasCredentialsById(id);

    if (has === false) {
      throw new NotFoundCredentialsException();
    }

    await credentialsQuery.updateCredentialsStatus(id, body.status);
  }

  async updateCredentialsPassword(id: number, body: UpdateCredentialsPasswordBodyDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);

    const has = await credentialsQuery.hasCredentialsById(id);

    if (has === false) {
      throw new NotFoundCredentialsException();
    }

    if (body.newPassword !== body.confirmPassword) {
      throw new InvalidPasswordException();
    }

    await credentialsQuery.updateCredentialsPassword(id, hashSync(body.newPassword, 10));
  }
}
