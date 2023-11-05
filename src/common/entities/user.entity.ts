import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  AuthStatusValue,
  DegreeValue,
  EmploymentStatusValue,
  GenderCode,
  LazyType,
  LazyWithNullType,
} from '../constants';

import { Team } from './team.entity';
import { Role } from './role.entity';
import { Project } from './project.entity';
import { ProjectOwners } from './project-owners.entity';
import { ProjectManagers } from './project-managers.entity';
import { ProjectLeaders } from './project-leaders.entity';
import { ProjectTimeRecord } from './project-time-record.entity';
import { ProjectTimeRecordLog } from './project-time-record-log.entity';

class Relations {
  @ManyToOne(() => Team, (e) => e.members, {
    onDelete: 'SET NULL',
    nullable: true,
    lazy: true,
  })
  @JoinColumn()
  team: LazyWithNullType<Team>;

  @OneToMany(() => Team, (e) => e.leader, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  teamsByLeader: LazyType<Team[]>;

  @ManyToOne(() => Role, (e) => e.users, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  role: Role | null;

  @OneToMany(() => ProjectOwners, (e) => e.project, {
    cascade: ['insert', 'remove'],
    lazy: true,
  })
  @JoinTable()
  projectByOwners: LazyType<Project[]>;

  @OneToMany(() => ProjectManagers, (e) => e.project, {
    cascade: ['insert', 'remove'],
    lazy: true,
  })
  @JoinTable()
  projectByManagers: LazyType<Project[]>;

  @OneToMany(() => ProjectLeaders, (e) => e.project, {
    cascade: ['insert', 'remove'],
    lazy: true,
  })
  @JoinTable()
  projectByLeaders: LazyType<Project[]>;

  @OneToMany(() => ProjectTimeRecord, (e) => e.user, {
    cascade: ['insert', 'update', 'remove'],
    lazy: true,
  })
  @JoinTable()
  projectTimeRecords: LazyType<ProjectTimeRecord[]>;

  @OneToOne(() => ProjectTimeRecordLog, (e) => e.user, {
    cascade: ['insert', 'update', 'remove'],
    nullable: true,
  })
  @JoinTable()
  projectTimeRecordLog: ProjectTimeRecordLog;
}

@Entity()
export class User extends Relations {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  readonly id: number;

  @Column({
    type: 'varchar',
    length: 400,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 400,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    default: null,
  })
  phone: string | null;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  birthday: Date | null;

  @Column({
    type: 'tinyint',
    unsigned: true,
    nullable: true,
    default: null,
  })
  genderCode: GenderCode | null;

  @Column({
    type: 'varchar',
    length: 8,
    nullable: true,
    default: null,
  })
  scienceCode: string | null;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: DegreeValue.Null,
  })
  degree: DegreeValue;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
  })
  school: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
  })
  major: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
  })
  carType: string | null;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    default: null,
  })
  carNumber: string | null;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: AuthStatusValue.Wating,
  })
  authStatus: AuthStatusValue;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: EmploymentStatusValue.Wating,
  })
  employmentStatus: EmploymentStatusValue;

  @Column({
    type: 'boolean',
    default: false,
  })
  init: boolean;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date | null;
}
