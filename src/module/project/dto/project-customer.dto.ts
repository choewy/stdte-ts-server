import { Customer } from '@entity';

export class ProjectCustomerDto {
  id: number;
  kr: string;
  en: string;
  alias: string;
  description: string;

  constructor(customer: Customer) {
    this.id = customer.id;
    this.kr = customer.kr;
    this.en = customer.en;
    this.alias = customer.alias;
    this.description = customer.description ?? '';
  }
}
