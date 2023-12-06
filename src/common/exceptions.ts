import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class CannotAccessException extends ForbiddenException {}
export class AlreadyUsedUserEmailException extends ConflictException {}
export class InvalidPasswordException extends BadRequestException {}

export class InvalidCredentialsException extends UnauthorizedException {
  constructor(e?: Error | null) {
    super();

    this.cause = e ?? null;
  }
}

export class AlreadyExistRoleException extends ConflictException {}
export class NotFoundRoleException extends NotFoundException {}
