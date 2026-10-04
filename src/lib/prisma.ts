import { PrismaClient } from '@prisma/client';

/* روی سرورلس هر lambda که warm می‌شود ماژول را دوباره ارزیابی می‌کند؛
   نگه‌داشتن نمونه روی globalThis — در توسعه و در production — از ساخت
   اتصال‌های تکراری و رسیدن به سقف اتصال دیتابیس جلوگیری می‌کند. */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

globalForPrisma.prisma = prisma;
