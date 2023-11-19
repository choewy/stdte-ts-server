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

import { LazyType, LazyWithNullType, ProjectScope } from '../constants';

import { Team } from './team.entity';
import { Project } from './project.entity';
import { ProjectTypeOption } from './project-type-option.entity';
import { ProjectTimeRecord } from './project-time-record.entity';

class Relations {
  @ManyToOne(() => Team, (e) => e.projectTypes, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn()
  team: LazyWithNullType<Team>;

  @OneToMany(() => Project, (e) => e.projectType, {
    cascade: ['insert', 'remove'],
    lazy: true,
  })
  @JoinTable()
  projects: LazyType<Project[]>;

  @OneToMany(() => ProjectTypeOption, (e) => e.projectType, {
    cascade: ['insert', 'update', 'remove', 'soft-remove'],
    lazy: true,
  })
  @JoinTable()
  projectTypeOptions: LazyType<ProjectTypeOption[]>;

  @OneToMany(() => ProjectTimeRecord, (e) => e.projectType, {
    cascade: ['remove'],
    lazy: true,
  })
  @JoinTable()
  projectTimeRecords: LazyType<ProjectTimeRecord[]>;
}

@Entity()
export class ProjectType extends Relations {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  readonly id: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: ProjectScope.Team,
  })
  scope: ProjectScope;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date | null;
}
