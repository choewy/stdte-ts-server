import { v4 } from 'uuid';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';
import { Base64ValueTransformer } from '../constants';

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
    transformer: new Base64ValueTransformer(),
  })
  params: Record<string, string> | string | null;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
    default: null,
    transformer: new Base64ValueTransformer(),
  })
  query: Record<string, any> | string | null;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
    default: null,
    transformer: new Base64ValueTransformer(),
  })
  body: object | string | null;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
    default: null,
    transformer: new Base64ValueTransformer(),
  })
  exception: object | string | null;

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
