import { Column, DeepPartial, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { RolePolicyScope } from '../constants';

import { Role } from './role.entity';

class Relations {
  @OneToOne(() => Role, (e) => e.rolePolicy, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  role: Role;
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
    default: RolePolicyScope.Limit,
  })
  accessRole: RolePolicyScope;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: RolePolicyScope.Limit,
  })
  accessTeam: RolePolicyScope;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: RolePolicyScope.Limit,
  })
  accessUser: RolePolicyScope;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: RolePolicyScope.Limit,
  })
  accessProject: RolePolicyScope;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  constructor(rolePolicy?: DeepPartial<RolePolicy>) {
    super();

    if (rolePolicy) {
      Object.assign(this, rolePolicy);
    }
  }
}
