import { Customer } from '@entity';
import { toISOString } from '@server/common';
import { CustomerProjectDto } from './customer-project.dto';

export class CustomerDto {
  id: number;
  kr: string;
  en: string;
  alias: string;
  projects: CustomerProjectDto[];
  description: string;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(customer: Customer) {
    this.id = customer.id;
    this.kr = customer.kr;
    this.en = customer.en;
    this.alias = customer.alias;
    this.projects = customer.projects.map((project) => new CustomerProjectDto(project));
    this.description = customer.description ?? '';
    this.createdAt = toISOString(customer.createdAt);
    this.updatedAt = toISOString(customer.updatedAt);
  }
}
