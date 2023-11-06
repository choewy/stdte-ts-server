import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const getResponse = (response: string | object, details?: any) => {
  if (typeof response === 'string') {
    return response;
  } else {
    return { ...response, details };
  }
};

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

  public getResponse(): string | object {
    return getResponse(super.getResponse(), this.cause);
  }
}

export class AccessDeninedException extends ForbiddenException {
  constructor(cause?: any) {
    super('접근 권한이 없습니다.');

    this.cause = cause;
  }

  public getResponse(): string | object {
    return getResponse(super.getResponse(), this.cause);
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

export class WrongPasswordException extends UnauthorizedException {
  constructor() {
    super('비밀번호가 일치하지 않습니다.');
  }
}

export class NotSamePasswordException extends BadRequestException {
  constructor() {
    super('비밀번호가 같지 않습니다.');
  }
}

export class NotFoundMyProfileException extends NotFoundException {
  constructor() {
    super('내 정보를 불러오는데 실패하였습니다.');
  }
}

export class AlreadyExistRoleNameException extends ConflictException {
  constructor() {
    super('이미 존재하는 역할명입니다.');
  }
}

export class CannotUpdateYourRoleException extends ConflictException {
  constructor() {
    super('자신이 속한 역할의 현재 권한보다 낮은 권한을 부여할 수 없습니다.');
  }
}

export class CannotDeleteYourRoleException extends ConflictException {
  constructor() {
    super('자신이 속한 역할은 삭제할 수 없습니다.');
  }
}

export class NotFoundRoleException extends NotFoundException {
  constructor() {
    super('역할이 존재하지 않습니다.');
  }
}
