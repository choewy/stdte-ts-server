import { JwtPayload } from 'jsonwebtoken';

export type JwtTokenPayload = {
  id: number;
} & JwtPayload;

export type JwtVerifyResult = {
  payload: JwtTokenPayload | null;
  expired: boolean;
  error: Error | null;
};
