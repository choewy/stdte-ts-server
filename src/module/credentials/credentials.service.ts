import { Response } from 'express';
import { DataSource } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { CredentialsStatus, User } from '@entity';
import {
  UserQuery,
  CredentialsQuery,
  AlreadyExistUserEmailException,
  IncorrectPasswordException,
  InvalidCredentialsException,
  NotFoundUserException,
  ResponseDto,
  Request,
  TimeLogQuery,
  ListDto,
  CREDENTIALS_STATUS_VALUES,
  RoleQuery,
} from '@server/common';
import { CookieKey, CookieService, JwtService, JwtTokenType } from '@server/core';

import {
  CredentialsDto,
  SigninBodyDto,
  SignupBodyDto,
  PasswordUpdateBodyDto,
  CredentialsUpdateStatusBodyDto,
  CredentialsUpdatePasswordBodyDto,
  CredentialsStatsDto,
  CredentialsListQueryDto,
  CredentialsRowDto,
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

  async getCredentialsStats() {
    const credentialsQuery = new CredentialsQuery(this.dataSource);
    const credentialsStats = await credentialsQuery.findCredentialsStats();

    const dto: CredentialsStatsDto[] = [];

    for (const status of CREDENTIALS_STATUS_VALUES) {
      const row = credentialsStats.find((row) => row.status === status);

      if (row) {
        dto.push(new CredentialsStatsDto(status, row.count));
      } else {
        dto.push(new CredentialsStatsDto(status, 0));
      }
    }

    return dto;
  }

  async getCredentialsList(query: CredentialsListQueryDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);

    return new ListDto(query, await credentialsQuery.findCredentialsList(query), CredentialsRowDto);
  }

  async signup(req: Request, res: Response, body: SignupBodyDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);
    const hasCredentials = await credentialsQuery.hasCredentialsByEmail(body.email);

    if (hasCredentials === true) {
      throw new AlreadyExistUserEmailException();
    }

    if (body.password !== body.confirmPassword) {
      throw new IncorrectPasswordException();
    }

    const user = await this.dataSource.transaction(async (em) => {
      const userQuery = new UserQuery(em);
      const user = await userQuery.createUser({ name: body.name });

      const credentialsQuery = new CredentialsQuery(em);
      user.credentials = await credentialsQuery.saveCredentials(user, {
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
      throw new IncorrectPasswordException();
    }

    if (body.newPassword !== body.confirmPassword) {
      throw new IncorrectPasswordException();
    }

    await credentialsQuery.updateCredentialsPassword(userId, hashSync(body.newPassword, 10));
  }

  async updateCredentialsStatus(id: number, body: CredentialsUpdateStatusBodyDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);
    const hasCredentials = await credentialsQuery.hasCredentialsById(id);

    if (hasCredentials === false) {
      throw new NotFoundUserException();
    }

    await this.dataSource.transaction(async () => {
      const credentialsQuery = new CredentialsQuery(this.dataSource);
      await credentialsQuery.updateCredentialsStatus(id, body.status);

      if (body.status === CredentialsStatus.Reject) {
        return;
      }

      const userQuery = new UserQuery(this.dataSource);
      const roleQuery = new RoleQuery(this.dataSource);

      if (body.status === CredentialsStatus.Active) {
        const role = await roleQuery.findRoleByDefault();
        await userQuery.updateUser(id, { role: role == null ? null : { id: role.id } });
      } else {
        await userQuery.updateUser(id, { role: null });
      }
    });
  }

  async updateCredentialsPassword(id: number, body: CredentialsUpdatePasswordBodyDto) {
    const credentialsQuery = new CredentialsQuery(this.dataSource);
    const hasCredentials = await credentialsQuery.hasCredentialsById(id);

    if (hasCredentials === false) {
      throw new NotFoundUserException();
    }

    if (body.newPassword !== body.confirmPassword) {
      throw new IncorrectPasswordException();
    }

    await credentialsQuery.updateCredentialsPassword(id, hashSync(body.newPassword, 10));
  }
}
