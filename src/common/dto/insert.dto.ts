import { InsertResult } from 'typeorm';

export class InsertDto<ID = string | number> {
  id: ID;

  constructor(insert: InsertResult) {
    this.id = insert.identifiers[0]?.id;
  }
}
