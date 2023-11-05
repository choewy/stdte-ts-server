import { JwtPayload } from 'jsonwebtoken';

import { User } from '@server/common';

export type SignAccessPayload = JwtPayload & Pick<User, 'id' | 'name' | 'email'>;
export type SignRefreshPayload = JwtPayload & Pick<User, 'id'>;
