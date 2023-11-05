import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';

export class InvalidJwtTokenException extends UnauthorizedException {
  constructor(e?: unknown) {
    super('인증에 실패하였습니다. 다시 로그인하세요.');

    if (e instanceof Error) {
      this.cause = {
        name: e.name,
        message: e.message,
      };
    }
  }

  getResponse(): string | object {
    return {
      ...(super.getResponse() as object),
      cause: this.cause,
    };
  }
}

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
