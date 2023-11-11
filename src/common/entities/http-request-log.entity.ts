import { v4 } from 'uuid';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

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
  readonly id: string = [Date.now(), v4()].join('_');

  @Column({
    type: 'varchar',
    length: 100,
  })
  ip: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  method: string;

  @Column({
    type: 'varchar',
    length: 1024,
  })
  path: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
    default: null,
  })
  params: string | null;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
    default: null,
  })
  query: string | null;

  @Column({
    type: 'varchar',
    length: 5012,
    nullable: true,
    default: null,
  })
  body: string | null;

  @Column({
    type: 'smallint',
    unsigned: true,
    nullable: true,
    default: null,
  })
  statusCode: number | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
  })
  statusMessage: string | null;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: null,
  })
  exceptionName: string | null;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: null,
  })
  exceptionMessage: string | null;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: null,
  })
  errorName: string | null;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: null,
  })
  errorMessage: string | null;

  @Column({
    type: 'varchar',
    length: 5012,
    nullable: true,
    default: null,
  })
  errorStack: string | null;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
