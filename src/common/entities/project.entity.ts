import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LazyType, LazyWithNullType, ProjectScope, ProjectStatus } from '../constants';

import { User } from './user.entity';
import { ProjectType } from './project-type.entity';
import { ProjectTimeRecord } from './project-time-record.entity';
import { ProjectOwners } from './project-owners.entity';
import { ProjectManagers } from './project-managers.entity';
import { ProjectLeaders } from './project-leaders.entity';

class Relations {
  @ManyToOne(() => ProjectType, (e) => e.projects, {
    onDelete: 'SET NULL',
    nullable: true,
    lazy: true,
  })
  @JoinColumn()
  projectType: LazyWithNullType<ProjectType>;

  @OneToMany(() => ProjectTimeRecord, (e) => e.project, {
    cascade: ['remove'],
    lazy: true,
  })
  @JoinTable()
  projectTimeRecords: LazyType<ProjectTimeRecord[]>;

  @OneToMany(() => ProjectOwners, (e) => e.user, {
    cascade: ['insert', 'remove'],
    lazy: true,
  })
  @JoinTable()
  projectOwners: LazyType<User[]>;

  @OneToMany(() => ProjectManagers, (e) => e.user, {
    cascade: ['insert', 'remove'],
    lazy: true,
  })
  @JoinTable()
  projectManagers: LazyType<User[]>;

  @OneToMany(() => ProjectLeaders, (e) => e.user, {
    cascade: ['insert', 'remove'],
    lazy: true,
  })
  @JoinTable()
  projectLeaders: LazyType<User[]>;
}

@Entity()
export class Project extends Relations {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  readonly id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    default: null,
  })
  orderer: string | null;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
    default: null,
  })
  summary: string | null;

  @Column({
    type: 'bigint',
    unsigned: true,
  })
  income: bigint;

  @Column({
    type: 'varchar',
    length: 20,
    default: ProjectScope.Team,
  })
  scope: ProjectScope;

  @Column({
    type: 'varchar',
    length: 20,
    default: ProjectStatus.Wating,
  })
  status: ProjectStatus;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  startDate: Date | null;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  deadlineDate: Date | null;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  maintenanceDate: Date | null;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date | null;
}
