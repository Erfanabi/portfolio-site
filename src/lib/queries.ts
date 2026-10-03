import { prisma } from '@/lib/prisma';

/* ==========================================================================
   خواندن داده‌ها — در Server Component‌ها مستقیم صدا زده می‌شود
   ========================================================================== */

export const POSTS_PER_PAGE = 9;

export async function getPublishedPosts({
  page = 1,
  tag,
  q,
}: { page?: number; tag?: string; q?: string } = {}) {
  const where = {
    published: true,
    ...(tag ? { tags: { contains: tag } } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { excerpt: { contains: q } },
            { content: { contains: q } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        readMinutes: true,
        tags: true,
        featured: true,
        views: true,
        publishedAt: true,
        createdAt: true,
      },
    }),
    prisma.post.count({ where }),
  ]);

  return { items, total, pages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)) };
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findFirst({ where: { slug, published: true } });
}

export async function getRelatedPosts(postId: string, tags: string[], take = 3) {
  /* SQLite فیلتر «یکی از این برچسب‌ها» ندارد، پس با OR روی contains می‌سازیم */
  const tagFilters = tags.slice(0, 5).map((t) => ({ tags: { contains: t } }));

  const byTag = tagFilters.length
    ? await prisma.post.findMany({
        where: { published: true, id: { not: postId }, OR: tagFilters },
        orderBy: { publishedAt: 'desc' },
        take,
        select: { slug: true, title: true, excerpt: true, readMinutes: true, publishedAt: true },
      })
    : [];

  if (byTag.length >= take) return byTag;

  /* اگر برچسب مشترکی نبود، تازه‌ترین مقاله‌ها را نشان می‌دهیم */
  const fill = await prisma.post.findMany({
    where: {
      published: true,
      id: { not: postId },
      slug: { notIn: byTag.map((p) => p.slug) },
    },
    orderBy: { publishedAt: 'desc' },
    take: take - byTag.length,
    select: { slug: true, title: true, excerpt: true, readMinutes: true, publishedAt: true },
  });

  return [...byTag, ...fill];
}

export async function getAllTags() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { tags: true },
  });

  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const raw of p.tags.split(',')) {
      const tag = raw.trim();
      if (tag) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

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

export async function getFeaturedPosts(take = 3) {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    take,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      readMinutes: true,
      tags: true,
      publishedAt: true,
      createdAt: true,
    },
  });
}

/** افزودن یک بازدید — خطا نباید نمایش مقاله را خراب کند */
export async function bumpViews(id: string) {
  try {
    await prisma.post.update({ where: { id }, data: { views: { increment: 1 } } });
  } catch {
    /* بی‌اهمیت */
  }
}

export async function getAdminCounts() {
  const [posts, drafts, projects, messages, unread] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: false } }),
    prisma.project.count(),
    prisma.message.count({ where: { archived: false } }),
    prisma.message.count({ where: { read: false, archived: false } }),
  ]);
  return { posts, drafts, projects, messages, unread };
}
