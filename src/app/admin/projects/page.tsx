import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Badge, ButtonLink, EmptyState } from '@/components/ui';
import { PublishToggle } from '@/components/admin/PublishToggle';
import { categoryLabel } from '@/lib/site';
import { faDateTime, faNum, parseList } from '@/lib/utils';

export const metadata = { title: 'نمونه‌کارها' };

export default async function AdminProjectsPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');

  const projects = await prisma.project.findMany({
    orderBy: [{ order: 'asc' }, { updatedAt: 'desc' }],
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-ink">نمونه‌کارها</h1>
          <p className="num mt-1 text-[0.8rem] text-muted">
            {faNum(projects.length)} پروژه —{' '}
            {faNum(projects.filter((p) => !p.published).length)} منتشرنشده
          </p>
        </div>
        <ButtonLink href="/admin/projects/new" size="sm">
          + نمونه‌کار تازه
        </ButtonLink>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon="◫"
          title="هنوز نمونه‌کاری نساخته‌اید"
          description="پروژه‌هایی که ساخته‌اید را اضافه کنید؛ هر کدام صفحهٔ اختصاصی خودش را می‌گیرد."
          action={
            <ButtonLink href="/admin/projects/new" size="sm" className="mt-2">
              افزودن اولین نمونه‌کار
            </ButtonLink>
          }
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="glass flex flex-col gap-3 rounded-[var(--radius-md)] p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {project.published ? (
                    <Badge tone="success">منتشرشده</Badge>
                  ) : (
                    <Badge tone="warning">منتشرنشده</Badge>
                  )}
                  <Badge tone="brand">{categoryLabel(project.category)}</Badge>
                  {project.featured && <Badge tone="brand">شاخص</Badge>}
                  <span className="num text-[0.7rem] text-muted">ترتیب: {faNum(project.order)}</span>
                </div>

                <h2 className="mt-2 truncate text-[0.92rem] font-bold text-ink">
                  <Link href={`/admin/projects/${project.id}`} className="hover:text-brand">
                    {project.title}
                  </Link>
                </h2>

                <p className="num mt-1 text-[0.72rem] text-muted">
                  ویرایش: {faDateTime(project.updatedAt)}
                  {project.client && ` · ${project.client}`}
                </p>

                {parseList(project.stack).length > 0 && (
                  <p className="mt-1.5 text-[0.7rem] text-brand/80">
                    {parseList(project.stack).join(' · ')}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <PublishToggle
                  kind="projects"
                  id={project.id}
                  published={project.published}
                  title={project.title}
                />

                {project.published && (
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="rounded-full px-3 py-2 text-[0.75rem] font-semibold text-ink-2 transition-colors hover:text-brand"
                  >
                    دیدن ↗
                  </Link>
                )}

                <Link
                  href={`/admin/projects/${project.id}`}
                  className="glass-soft rounded-full px-3.5 py-2 text-[0.75rem] font-semibold text-ink-2 transition-colors hover:text-brand"
                >
                  ویرایش
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
