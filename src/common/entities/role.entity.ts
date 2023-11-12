import {
  Column,
  CreateDateColumn,
  DeepPartial,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RolePolicy } from './role-policy.entity';
import { User } from './user.entity';

class Relations {
  @OneToOne(() => RolePolicy, (e) => e.role, {
    cascade: true,
  })
  @JoinTable()
  rolePolicy: RolePolicy;

  @OneToMany(() => User, (e) => e.role, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinTable()
  users: User[];
}

@Entity()
export class Role extends Relations {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  readonly id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  name: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  onInit: boolean;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  constructor(role?: DeepPartial<Role>) {
    super();

    if (role) {
      Object.assign(this, role);
    }
  }
}
