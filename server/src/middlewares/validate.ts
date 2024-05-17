import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { Role } from '@prisma/client';
import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import CustomError from '../errors/customError';
import { COOKIE_NAME, JWT_SECRET } from '../config/keys';

const validate = {
  cookie: asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies[COOKIE_NAME];
    if (!cookie) return next();
    const { token } = JSON.parse(cookie);
    const user: any = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  }),

  admin: asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new CustomError(`Not Found`, 404);
    const id = Number(req.user.id);
    const admin = await prisma.user.findUnique({
      where: { id, role: Role.ADMIN },
    });
    if (!admin) throw new CustomError(`Forbidden`, 403);
    next();
  }),
};

export default validate;
