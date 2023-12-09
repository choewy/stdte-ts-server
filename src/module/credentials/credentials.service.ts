import { Response } from 'express';
import { DataSource } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { Credentials } from '@entity';
import {
  UserQuery,
  CredentialsQuery,
  AlreadyExistUserEmailException,
  InvalidPasswordException,
  InvalidCredentialsException,
  NotFoundUserException,
} from '@server/common';
import { CookieKey, CookieService, JwtService, JwtTokenType } from '@server/core';

import {
  CredentialsDto,
  SigninBodyDto,
  SignupBodyDto,
  PasswordUpdateBodyDto,
  CredentialsUpdateStatusBodyDto,
  CredentialsUpdatePasswordBodyDto,
} from './dto';

@Injectable()
export class CredentialsService {
  constructor(private readonly dataSource: DataSource) {}

  private setTokensInCookie(res: Response, credentials: Credentials) {
    const cookieService = new CookieService();
    const jwtService = new JwtService();

    cookieService.set(res, CookieKey.Access, jwtService.issue(JwtTokenType.Access, { id: credentials.id }));
    cookieService.set(res, CookieKey.Refresh, jwtService.issue(JwtTokenType.Access, { id: credentials.id }));

    res.send(new CredentialsDto(credentials));
  }

  private removeTokensAtCookie(res: Response) {
    const cookieService = new CookieService();

    cookieService.delete(res, CookieKey.Access);
    cookieService.delete(res, CookieKey.Refresh);
  }

  async getMyCredentials(userId: number) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);
    const credentials = await credentialsQuery.findCredentialsByUserId(userId);

    if (credentials == null) {
      throw new InvalidCredentialsException();
    }

    return new CredentialsDto(credentials);
  }

  async signup(res: Response, body: SignupBodyDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);
    const hasCredentials = await credentialsQuery.hasCredentialsByEmail(body.email);

    if (hasCredentials === true) {
      throw new AlreadyExistUserEmailException();
    }

    if (body.password !== body.confirmPassword) {
      throw new InvalidPasswordException();
    }

    const credentials = await this.dataSource.transaction(async (em) => {
      const userQuery = new UserQuery(em);
      const credentialsQuery = new CredentialsQuery(em);

      const user = await userQuery.createUser({ name: body.name });
      const credentials = await credentialsQuery.createCredentials(user, {
        email: body.email,
        password: hashSync(body.password, 10),
      });

      return credentials;
    });

    return this.setTokensInCookie(res, credentials);
  }

  async signin(res: Response, body: SigninBodyDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);
    const credentials = await credentialsQuery.findCredentialsByEmail(body.email);

    if (credentials == null) {
      throw new InvalidCredentialsException();
    }

    if (compareSync(body.password, credentials.password) === false) {
      throw new InvalidCredentialsException();
    }

    return this.setTokensInCookie(res, credentials);
  }

  async signout(res: Response) {
    return this.removeTokensAtCookie(res);
  }

  async updatePassword(userId: number, body: PasswordUpdateBodyDto) {
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

  async updateCredentialsStatus(id: number, body: CredentialsUpdateStatusBodyDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);
    const hasCredentials = await credentialsQuery.hasCredentialsById(id);

    if (hasCredentials === false) {
      throw new NotFoundUserException();
    }

    await credentialsQuery.updateCredentialsStatus(id, body.status);
  }

  async updateCredentialsPassword(id: number, body: CredentialsUpdatePasswordBodyDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);
    const hasCredentials = await credentialsQuery.hasCredentialsById(id);

    if (hasCredentials === false) {
      throw new NotFoundUserException();
    }

    if (body.newPassword !== body.confirmPassword) {
      throw new InvalidPasswordException();
    }

    await credentialsQuery.updateCredentialsPassword(id, hashSync(body.newPassword, 10));
  }
}
