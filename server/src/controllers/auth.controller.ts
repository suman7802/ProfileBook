import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import catchAsync from '../errors/catchAsync';
import CustomError from '../errors/customError';
import verifyUser from '../utils/verifyUser';
import { getUser } from '../utils/verifiedUser';
import registerUser from '../utils/registerUser';
import { validateEmail, validatePassword } from '../utils/validateEmail';
import { JWT_SECRET, COOKIE_NAME, AGE_OF_COOKIE, ADMIN_PASSWORD } from '../config/keys';
import { Role } from '@prisma/client';

const ageOfCooke = AGE_OF_COOKIE as number;

const authController = {
  signup: catchAsync(async (req: Request, res: Response) => {
    const { email, password, fullName, role, adminPassword } = req.body;
    if (!email || !password) throw new CustomError('email and password required', 400);

    // validate email and password
    validateEmail(email);
    validatePassword(password);

    if (role) {
      if (role !== Role.USER && role !== Role.ADMIN) throw new CustomError('Invalid role', 400);

      if (role === Role.ADMIN) {
        if (!adminPassword) throw new CustomError('admin password required', 400);
        if (adminPassword !== ADMIN_PASSWORD) throw new CustomError('Invalid admin password', 400);
      }
    }

    const user = await registerUser(email, password, fullName, role);

    res.status(201).json(user);
  }),

  verify: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    if (!email || !otp) return next(new CustomError('email and otp required', 400));

    validateEmail(email);

    const user = await getUser(email);
    if (!user) return next(new CustomError(`User Not Found`, 404));

    if (user.otpExpiry < new Date())
      return next(new CustomError('OTP Expired! Please sign-up again', 403));

    const validOTP = await bcrypt.compare(otp, user.otp);
    if (!validOTP) return next(new CustomError('invalid OTP', 400));

    await verifyUser(email);

    res.status(200).json('User Verified');
  }),

  login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new CustomError('email and password required', 400));

    validateEmail(email);

    const user = await getUser(email);
    if (!user) return next(new CustomError(`User Not Found`, 404));

    if (!user.verified) {
      if (user.otpExpiry < new Date())
        // otp is not expired
        return next(new CustomError('Please sign-up again', 403));

      // otp is expired
      return next(new CustomError('Please verify your account first', 403));
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return next(new CustomError('invalid Password', 400));

    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET
    );

    let sanitizedUser = {
      ...user,
      id: undefined,
      otp: undefined,
      picture: undefined,
      password: undefined,
      otpExpiry: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    };

    res
      .status(200)
      .cookie(COOKIE_NAME, JSON.stringify({ token }), {
        path: '/',
        secure: false,
        maxAge: ageOfCooke,
      })
      .json({
        user: sanitizedUser,
        token,
      });
  }),
};

export default authController;
