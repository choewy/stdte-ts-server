import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from './user.entity';
import { Project } from './project.entity';

class Relations {
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Project)
  @JoinColumn()
  project: Project;
}

@Entity()
export class ProjectOwners extends Relations {
  @PrimaryColumn({ type: 'int', unsigned: true })
  userId: number;

  @PrimaryColumn({ type: 'int', unsigned: true })
  projectId: number;

  @CreateDateColumn()
  readonly createdAt: Date;
}
