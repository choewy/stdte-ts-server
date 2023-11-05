import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { LazyType, LazyWithNullType } from '../constants';

import { User } from './user.entity';
import { Project } from './project.entity';
import { ProjectType } from './project-type.entity';
import { ProjectTypeOption } from './project-type-option.entity';

class Relations {
  @ManyToOne(() => User, (e) => e.projectTimeRecords, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn()
  user: LazyType<User>;

  @ManyToOne(() => Project, (e) => e.projectTimeRecords, {
    onDelete: 'SET NULL',
    nullable: true,
    lazy: true,
  })
  @JoinColumn()
  project: LazyWithNullType<Project>;

  @ManyToOne(() => ProjectType, (e) => e.projectTimeRecords, {
    onDelete: 'SET NULL',
    nullable: true,
    lazy: true,
  })
  @JoinColumn()
  projectType: LazyWithNullType<ProjectType>;

  @ManyToOne(() => ProjectTypeOption, (e) => e.projectTimeRecords, {
    onDelete: 'SET NULL',
    nullable: true,
    lazy: true,
  })
  @JoinColumn()
  projectTypeOption: LazyWithNullType<ProjectTypeOption>;
}

@Entity()
export class ProjectTimeRecord extends Relations {
  @PrimaryColumn({
    type: 'varchar',
    length: 100,
  })
  key: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
  })
  time: number;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
    default: null,
  })
  memo: string | null;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
