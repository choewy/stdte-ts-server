import { UseGuards } from '@nestjs/common';

import { AuthGuard } from './auth.guard';

export const UseAuthGuard = () => UseGuards(AuthGuard);
