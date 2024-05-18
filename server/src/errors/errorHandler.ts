import { NextFunction, Request, Response } from 'express';

interface Error {
  status?: number;
  message?: string;
}

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.message, err.status);
  res.status(err.status || 500).json({ message: err.message || 'An unexpected error occurred' });
}
