import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';

export class AlreadyUsedUserEmailException extends ConflictException {}
export class InvalidPasswordException extends BadRequestException {}
export class InvalidCredentialsException extends UnauthorizedException {
  constructor(e?: Error | null) {
    super();

    this.cause = e ?? null;
  }
}
