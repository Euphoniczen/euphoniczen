// test-prisma.js
import { PrismaClient } from '@prisma/client';

console.log('Prisma client imported successfully');
const prisma = new PrismaClient();
prisma.$connect()
  .then(() => {
    console.log('Connected to the database successfully!');
    return prisma.$disconnect();
  })
  .catch((error: unknown) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });

// RUN: npx ts-node --esm test-prisma.ts in the command to test the connection