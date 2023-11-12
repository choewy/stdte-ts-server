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
  WrongPasswordException,
  ProjectTimeRecordLog,
  InjectWriterDataSource,
  InjectReaderDataSource,
} from '@server/common';
import { CookieService, BcryptService, SignService, HashService } from '@server/core';
import { RequestUserResponseDto } from '@server/dto';

import { SignInBodyDto, SignUpBodyDto, UpdatePasswordBodyDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectWriterDataSource()
    private readonly writerDataSource: DataSource,
    @InjectReaderDataSource()
    private readonly readerDataSource: DataSource,
  ) {}

  private responseWithTokens(response: Response, user: User): Response {
    const signService = new SignService();
    const cookieService = new CookieService();

    const access = signService.issueAccess(user);
    const refresh = signService.issueRefresh(user);

    cookieService.set(response, CookieKey.Access, access);
    cookieService.set(response, CookieKey.Refresh, refresh);

    return response.status(HttpStatus.CREATED).send(new RequestUserResponseDto(user));
  }

  async signin(response: Response, body: SignInBodyDto): Promise<Response> {
    const user = await UserQuery.of(this.readerDataSource).findUserByEmail(body.email);

    if (user === null) {
      throw new SignInFailException();
    }

    const hashService = new HashService();
    const password = hashService.fromHex(body.password);

    const bcryptService = new BcryptService();

    if (!bcryptService.comparePassword(user.password, password)) {
      throw new SignInFailException();
    }

    return this.responseWithTokens(response, user);
  }

  async signup(response: Response, body: SignUpBodyDto): Promise<Response> {
    const userExist = await UserQuery.of(this.readerDataSource).hasUserByEmail(body.email);

    if (userExist) {
      throw new AlreadyExistUserException();
    }

    const hashService = new HashService();

    const password = hashService.fromHex(body.password);
    const confirmPassword = hashService.fromHex(body.confirmPassword);

    if (password !== confirmPassword) {
      throw new NotSamePasswordException();
    }

    const bcryptService = new BcryptService();

    const user = await UserQuery.of(this.writerDataSource).saveUser({
      name: body.name,
      email: body.email,
      password: bcryptService.encryptPassword(password),
      projectTimeRecordLog: new ProjectTimeRecordLog(),
    });

    return this.responseWithTokens(response, user);
  }

  async signout(response: Response): Promise<Response> {
    const cookieService = new CookieService();

    cookieService.delete(response, CookieKey.Access);
    cookieService.delete(response, CookieKey.Refresh);

    return response.sendStatus(HttpStatus.OK);
  }

  async updateMyPassword(user: User, body: UpdatePasswordBodyDto): Promise<void> {
    const hashService = new HashService();

    const currentPassword = hashService.fromHex(body.currentPassword);
    const newPassword = hashService.fromHex(body.newPassword);
    const confirmPassword = hashService.fromHex(body.confirmPassword);

    const bcryptService = new BcryptService();

    if (!bcryptService.comparePassword(user.password, currentPassword)) {
      throw new WrongPasswordException();
    }

    if (newPassword !== confirmPassword) {
      throw new NotSamePasswordException();
    }

    await UserQuery.of(this.writerDataSource).updateUser(user.id, {
      password: bcryptService.encryptPassword(newPassword),
    });
  }
}
