import { projects, type Project } from '@/lib/projects';

/* ==========================================================================
   خواندن نمونه‌کارها — همه از دادهٔ استاتیک، بدون دیتابیس و بدون درخواست شبکه
   ========================================================================== */

/* ترتیب نمایش: منتخب‌ها اول، بعد بر اساس order */
function byDisplayOrder(a: Project, b: Project): number {
  if (!!b.featured !== !!a.featured) return Number(!!b.featured) - Number(!!a.featured);
  return (a.order ?? 0) - (b.order ?? 0);
}

export function getPublishedProjects({ category }: { category?: string } = {}): Project[] {
  return projects
    .filter((p) => p.published !== false)
    .filter((p) => !category || category === 'all' || p.category === category)
    .sort(byDisplayOrder);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(take = 3): Project[] {
  return getPublishedProjects().slice(0, take);
}
