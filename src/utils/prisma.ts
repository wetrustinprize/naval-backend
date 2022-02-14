import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({
  ...process.env.NODE_ENV === 'test' && {
    datasources: {
      db: {
        url: process.env.DATABASE_URL?.replace('public', 'test'),
      },
    },
  },
});

export default prismaClient;
