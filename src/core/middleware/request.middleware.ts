import { RequestHandler } from 'express';

export const requestBinder: RequestHandler = (req, res, next) => {
  next();
};
