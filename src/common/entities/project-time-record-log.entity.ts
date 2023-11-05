import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { LazyType } from '../constants';

import { User } from './user.entity';

class Relations {
  @OneToOne(() => User, (e) => e.projectTimeRecordLog, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn()
  user: LazyType<User>;
}

@Entity()
export class ProjectTimeRecordLog extends Relations {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  readonly id: number;

  @Column({ type: 'datetime' })
  lastUpdatedAt: Date;

  @BeforeInsert()
  protected beforeInsert() {
    this.lastUpdatedAt = new Date();
  }
}
