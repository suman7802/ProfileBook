import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => console.log('Database is connected'))
  .catch((error) => console.error('Error connecting to the database:', error));

export default prisma;
