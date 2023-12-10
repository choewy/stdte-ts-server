import { InsertResult } from 'typeorm';

export class InsertDto {
  id: number;

  constructor(insert: InsertResult) {
    this.id = insert.raw.insertId;
  }
}
