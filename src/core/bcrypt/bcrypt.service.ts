import { Injectable } from '@nestjs/common';

import bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  public encryptPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  public comparePassword(userPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }
}
