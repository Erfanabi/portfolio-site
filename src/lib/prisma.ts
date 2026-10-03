import { PrismaClient } from '@prisma/client';

/* در حالت توسعه، Next ماژول‌ها را دوباره بارگذاری می‌کند؛
   نگه‌داشتن نمونه روی globalThis از ساخت اتصال‌های تکراری جلوگیری می‌کند. */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
