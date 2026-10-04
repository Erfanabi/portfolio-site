import { prisma } from '@/lib/prisma';

/* ==========================================================================
   خواندن داده‌ها — در Server Component‌ها مستقیم صدا زده می‌شود
   ========================================================================== */

export async function getPublishedProjects({ category }: { category?: string } = {}) {
  return prisma.project.findMany({
    where: {
      published: true,
      ...(category && category !== 'all' ? { category } : {}),
    },
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({ where: { slug, published: true } });
}

export async function getFeaturedProjects(take = 3) {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    take,
  });
}
