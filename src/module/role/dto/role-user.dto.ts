import { User } from '@entity';

export class RoleUserDto {
  id: number;
  name: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
  }
}
