import { Response } from 'express';
import { DataSource } from 'typeorm';

import { HttpStatus, Injectable } from '@nestjs/common';

import {
  User,
  UserQuery,
  AlreadyExistUserException,
  SignInFailException,
  NotSamePasswordException,
  CookieKey,
  NotFoundMyProfileException,
  WrongPasswordException,
  ProjectTimeRecordLog,
  InjectWriterDataSource,
  InjectReaderDataSource,
} from '@server/common';
import { CookieService, BcryptService, SignService } from '@server/core';

import { SignInBodyDto, SignResponseDto, SignUpBodyDto, UpdatePasswordBodyDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectWriterDataSource()
    private readonly writerDataSource: DataSource,
    @InjectReaderDataSource()
    private readonly readerDataSource: DataSource,
  ) {}

  private responseWithTokens(response: Response, user: User, withTokens = false): Response {
    const signService = new SignService();
    const cookieService = new CookieService();

    const access = signService.issueAccess(user);
    const refresh = signService.issueRefresh(user);

    cookieService.set(response, CookieKey.Access, access);
    cookieService.set(response, CookieKey.Refresh, refresh);

    return response.status(HttpStatus.CREATED).send(new SignResponseDto(user, access, refresh, withTokens));
  }

  async signin(response: Response, body: SignInBodyDto): Promise<Response> {
    const user = await UserQuery.of(this.readerDataSource).findUserByEmail(body.email);

    if (user === null) {
      throw new SignInFailException();
    }

    const bcryptService = new BcryptService();

    if (!bcryptService.comparePassword(user.password, body.password)) {
      throw new SignInFailException();
    }

    return this.responseWithTokens(response, user, body.withTokens);
  }

  async signup(response: Response, body: SignUpBodyDto): Promise<Response> {
    const userExist = await UserQuery.of(this.readerDataSource).hasUserByEmail(body.email);

    if (userExist) {
      throw new AlreadyExistUserException();
    }

    if (body.password !== body.confirmPassword) {
      throw new NotSamePasswordException();
    }

    const bcryptService = new BcryptService();

    const user = await UserQuery.of(this.writerDataSource).saveUser({
      name: body.name,
      email: body.email,
      password: bcryptService.encryptPassword(body.password),
      projectTimeRecordLog: new ProjectTimeRecordLog(),
    });

    return this.responseWithTokens(response, user, body.withTokens);
  }

  async signout(response: Response): Promise<Response> {
    const cookieService = new CookieService();

    cookieService.delete(response, CookieKey.Access);
    cookieService.delete(response, CookieKey.Refresh);

    return response.sendStatus(HttpStatus.OK);
  }

  async updateMyPassword(id: number, email: string, body: UpdatePasswordBodyDto): Promise<void> {
    const user = await UserQuery.of(this.readerDataSource).findUserPasswordByUserId(id);

    if (user === null) {
      throw new NotFoundMyProfileException();
    }

    if (user.email !== email) {
      throw new NotFoundMyProfileException();
    }

    const bcryptService = new BcryptService();

    if (!bcryptService.comparePassword(user.password, body.currentPassword)) {
      throw new WrongPasswordException();
    }

    if (body.newPassword !== body.confirmPassword) {
      throw new NotSamePasswordException();
    }

    await UserQuery.of(this.writerDataSource).updateUser(id, {
      password: bcryptService.encryptPassword(body.newPassword),
    });
  }
}
