import { Customer } from '@entity';

import { SelectDto } from './select.dto';

export class SelectCustomerDto extends SelectDto {
  constructor(customer: Customer) {
    super(customer.id, `${customer.alias}(${[customer.kr, customer.en].join(', ')}`);
  }
}
