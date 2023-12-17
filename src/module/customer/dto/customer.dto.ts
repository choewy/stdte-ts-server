import { Customer } from '@entity';
import { toISOString } from '@server/common';

export class CustomerDto {
  id: number;
  kr: string;
  en: string;
  alias: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(customer: Customer) {
    this.id = customer.id;
    this.kr = customer.kr;
    this.en = customer.en;
    this.alias = customer.alias;
    this.description = customer.description ?? '';
    this.createdAt = toISOString(customer.createdAt);
    this.updatedAt = toISOString(customer.updatedAt);
  }
}
