import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { LazyType, RolePolicyScopeValue } from '../constants';

import { Role } from './role.entity';

class Relations {
  @OneToOne(() => Role, (e) => e.rolePolicy, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn()
  role: LazyType<Role>;
}

@Entity()
export class RolePolicy extends Relations {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  readonly id: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: RolePolicyScopeValue.Limit,
  })
  accessRole: RolePolicyScopeValue;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: RolePolicyScopeValue.Limit,
  })
  accessTeam: RolePolicyScopeValue;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: RolePolicyScopeValue.Limit,
  })
  accessUser: RolePolicyScopeValue;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: RolePolicyScopeValue.Limit,
  })
  accessProject: RolePolicyScopeValue;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
