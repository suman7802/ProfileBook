import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function verifiedUser(email: string) {
  return await prisma.user.findUnique({
    where: { email, verified: true },
  });
}

export async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}
