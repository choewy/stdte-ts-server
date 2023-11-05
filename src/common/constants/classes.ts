import { Repository } from 'typeorm';

export class BaseQuery<T> {
  constructor(protected readonly repository: Repository<T>) {}
}
