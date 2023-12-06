import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  ValidationError,
} from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super();

    const error = errors[0];

    if (error) {
      this.cause = Object.values(error.constraints ?? {});
    }
  }
}

export class CannotAccessException extends ForbiddenException {}
export class AlreadyUsedUserEmailException extends ConflictException {}
export class InvalidPasswordException extends BadRequestException {}
export class NotFoundUserCredentialsException extends NotFoundException {}

export class InvalidCredentialsException extends UnauthorizedException {
  constructor(e?: Error | null) {
    super();

    this.cause = e ?? null;
  }
}

export class AlreadyExistRoleException extends ConflictException {}
export class NotFoundRoleException extends NotFoundException {}
export class AlreadyExistTeamException extends ConflictException {}
export class NotFoundTeamException extends ConflictException {}
