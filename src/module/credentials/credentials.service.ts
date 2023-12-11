import { Response } from 'express';
import { DataSource } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { User } from '@entity';
import {
  UserQuery,
  CredentialsQuery,
  AlreadyExistUserEmailException,
  InvalidPasswordException,
  InvalidCredentialsException,
  NotFoundUserException,
  ResponseDto,
  Request,
  TimeLogQuery,
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

  private setTokensInCookie(req: Request, res: Response, user: User) {
    const cookieService = new CookieService();
    const jwtService = new JwtService();

    cookieService.set(res, CookieKey.Access, jwtService.issue(JwtTokenType.Access, { id: user.id }));
    cookieService.set(res, CookieKey.Refresh, jwtService.issue(JwtTokenType.Access, { id: user.id }));

    return res.send(new ResponseDto(req, new CredentialsDto(user)));
  }

  private removeTokensAtCookie(req: Request, res: Response) {
    const cookieService = new CookieService();

    cookieService.delete(res, CookieKey.Access);
    cookieService.delete(res, CookieKey.Refresh);

    return res.send(new ResponseDto(req));
  }

  async getMyCredentials(userId: number) {
    const userQuery = new UserQuery(this.dataSource);
    const user = await userQuery.findUserById(userId, {
      credentials: true,
      role: { policy: true },
    });

    if (user == null) {
      throw new InvalidCredentialsException();
    }

    return new CredentialsDto(user);
  }

  async signup(req: Request, res: Response, body: SignupBodyDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);
    const hasCredentials = await credentialsQuery.hasCredentialsByEmail(body.email);

    if (hasCredentials === true) {
      throw new AlreadyExistUserEmailException();
    }

    if (body.password !== body.confirmPassword) {
      throw new InvalidPasswordException();
    }

    const user = await this.dataSource.transaction(async (em) => {
      const userQuery = new UserQuery(em);
      const user = await userQuery.createUser({ name: body.name });

      const credentialsQuery = new CredentialsQuery(em);
      await credentialsQuery.insertCredentials(user, {
        email: body.email,
        password: hashSync(body.password, 10),
      });

      const timeLogQuery = new TimeLogQuery(em);
      await timeLogQuery.insertTimeLog(user.id);

      return user;
    });

    return this.setTokensInCookie(req, res, user);
  }

  async signin(req: Request, res: Response, body: SigninBodyDto) {
    const userQuery = new UserQuery(this.dataSource);
    const user = await userQuery.findUserByEmail(body.email);

    if (user == null) {
      throw new InvalidCredentialsException();
    }

    if (compareSync(body.password, user.credentials.password) === false) {
      throw new InvalidCredentialsException();
    }

    return this.setTokensInCookie(req, res, user);
  }

  async signout(req: Request, res: Response) {
    return this.removeTokensAtCookie(req, res);
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
