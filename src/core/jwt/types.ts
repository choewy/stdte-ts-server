import { JwtPayload } from 'jsonwebtoken';

export type JwtTokenPayload = {
  id: number;
} & JwtPayload;
