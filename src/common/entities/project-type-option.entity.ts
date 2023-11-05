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

import { LazyType } from '../constants';

import { ProjectType } from './project-type.entity';
import { ProjectTimeRecord } from './project-time-record.entity';

class Relations {
  @ManyToOne(() => ProjectType, (e) => e.projectTypeOptions, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn()
  projectType: LazyType<ProjectType>;

  @OneToMany(() => ProjectTimeRecord, (e) => e.projectTypeOption, {
    cascade: ['remove'],
    lazy: true,
  })
  @JoinTable()
  projectTimeRecords: LazyType<ProjectTimeRecord[]>;
}

@Entity()
export class ProjectTypeOption extends Relations {
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

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date | null;
}
