import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function verifyUser(email: string) {
  return await prisma.user.update({
    where: { email },
    data: { verified: true },
  });
}
