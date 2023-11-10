import { v4 } from 'uuid';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { RequestMethod } from '@nestjs/common';
import { User } from './user.entity';

class Relations {
  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  user: User | null;
}

@Entity()
export class HttpRequestLog extends Relations {
  @PrimaryColumn({
    type: 'varchar',
    length: 100,
  })
  readonly requestId: string = [Date.now(), v4()].join('_');

  @Column({
    type: 'varchar',
    length: 10,
  })
  method: RequestMethod;

  @Column({
    type: 'varchar',
    length: 100,
  })
  ip: string;

  @Column({
    type: 'json',
    nullable: true,
    default: null,
  })
  params: JSON | null;

  @Column({
    type: 'json',
    nullable: true,
    default: null,
  })
  query: JSON | null;

  @Column({
    type: 'json',
    nullable: true,
    default: null,
  })
  body: JSON | null;

  @Column({
    type: 'json',
    nullable: true,
    default: null,
  })
  exception: JSON | null;

  @Column({
    type: 'smallint',
    unsigned: true,
    nullable: true,
    default: null,
  })
  status: number | null;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
