import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LazyType } from '../constants';

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
    lazy: true,
  })
  @JoinTable()
  users: LazyType<User[]>;
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
  })
  name: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  init: boolean;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
