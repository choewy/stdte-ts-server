import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';

export class SignInFailException extends UnauthorizedException {
  constructor() {
    super('이메일 또는 비밀번호를 확인하세요.');
  }
}

export class AlreadyExistUserException extends ConflictException {
  constructor() {
    super('이미 가입된 이메일 계정입니다.');
  }
}

export class NotSamePasswordException extends BadRequestException {
  constructor() {
    super('비밀번호를 다시 확인하세요.');
  }
}
