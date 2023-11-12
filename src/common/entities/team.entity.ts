import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { LazyType } from '../constants';

import { User } from './user.entity';
import { ProjectType } from './project-type.entity';

class Relations {
  @ManyToOne(() => User, (e) => e.teamsByLeader, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  leader: User | null;

  @OneToMany(() => User, (e) => e.team, {
    cascade: ['update'],
    lazy: true,
  })
  @JoinTable()
  members: LazyType<User[]>;

  @OneToMany(() => ProjectType, (e) => e.team, {
    cascade: ['insert', 'update', 'remove', 'soft-remove'],
    lazy: true,
  })
  @JoinTable()
  projectTypes: LazyType<ProjectType[]>;
}

@Entity()
export class Team extends Relations {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  readonly id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date | null;
}
