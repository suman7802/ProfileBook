import prisma from '../models/db.model';
import asyncCatch from '../errors/catchAsync';
import uploadPhoto from '../config/cloudinary';
import CustomError from '../errors/customError';
import { NextFunction, Request, Response } from 'express';

const user = {
  updateProfile: asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new CustomError(`Not Found`, 404);

    const id = Number(req.user.id);

    const { fullName, bio } = req.body;

    let profileUrl = null;
    if (req.file) profileUrl = await uploadPhoto(req.file);

    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        bio,
        fullName,
        profile: profileUrl,
      },
    });

    res.status(202).json(updateUser);
  }),

  deleteProfile: asyncCatch(async (req: Request, res: Response) => {
    if (!req.user) throw new CustomError(`Not Found`, 404);
    const id = Number(req.user.id);
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).json('Profile deleted successfully');
  }),

  deleteProfileById: asyncCatch(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).json('Profile deleted successfully');
  }),

  profile: asyncCatch(async (req: Request, res: Response) => {
    if (!req.user) throw new CustomError(`Not Found`, 404);

    const id = Number(req.user.id);

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        fullName: true,
        profile: true,
        bio: true,
        role: true,
      },
    });

    res.status(200).json({ ...user });
  }),

  getUsers: asyncCatch(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      skip: Number(req.params.index),
      take: 5,
    });
    res.status(200).json(users);
  }),
};

export default user;
