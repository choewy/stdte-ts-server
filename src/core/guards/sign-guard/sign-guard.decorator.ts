import { UseGuards } from '@nestjs/common';

import { SignGuard } from './sign.guard';

export const UseSignGuard = () => UseGuards(SignGuard);
