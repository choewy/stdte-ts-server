import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';

export class AlreadyUsedUserEmailException extends ConflictException {}
export class InvalidPasswordException extends BadRequestException {}
export class InvalidUserCredentialsException extends UnauthorizedException {}
