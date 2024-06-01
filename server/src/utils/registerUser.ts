import bcrypt from 'bcryptjs';
import { fork } from 'child_process';
import generateOTP from './generateOTP';
import { NODE_ENV } from '../config/keys';
import { verifiedUser } from './verifiedUser';
import CustomError from '../errors/customError';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

type ReturnObjectType = {
  otp?: string;
  email: string;
  OTPExpire: Date;
  otpMessage: unknown;
};

export default async function registerUser(
  email: string,
  password: string,
  fullName: string,
  role: Role
) {
  const user = await verifiedUser(email);
  if (user) throw new CustomError('User already exists', 400);

  // if user is new or not verified
  const { hashedOTP, OTP } = await generateOTP();
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      role: role ?? 'USER',
      email,
      fullName,
      otp: hashedOTP,
      password: hashedPassword,
      otpExpiry: new Date(Date.now() + 1000 * 60 * 60), //expire after 1 hour
    },
  });

  const forked = fork(require.resolve('ts-node/dist/bin'), [
    require.resolve('./sendOTPProcess'),
    OTP,
    email,
  ]);

  const otpSendStatus = new Promise((resolve) => {
    forked.on('message', (message) => resolve(message));
  });
  const otpMessage = await otpSendStatus;

  const returnObject: ReturnObjectType = {
    otp: OTP,
    otpMessage,
    email: newUser.email,
    OTPExpire: newUser.otpExpiry,
  };

  if (NODE_ENV === 'test') returnObject.otp = OTP;

  return returnObject;
}
