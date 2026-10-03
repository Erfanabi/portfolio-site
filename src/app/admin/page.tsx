import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getAdminCounts } from '@/lib/queries';
import { faDateTime, faNum } from '@/lib/utils';
import { Badge, ButtonLink } from '@/components/ui';

export default async function AdminDashboard() {
  /* بررسی کامل نشست — میدل‌ور فقط وجود کوکی را دیده است */
  if (!(await isAuthenticated())) redirect('/admin/login');

  const [counts, recentPosts, recentMessages] = await Promise.all([
    getAdminCounts(),
    prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, published: true, updatedAt: true, views: true },
    }),
    prisma.message.findMany({
      where: { archived: false },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, name: true, topic: true, read: true, createdAt: true },
    }),
  ]);

  const tiles = [
    { label: 'مقاله', value: counts.posts, href: '/admin/posts', hint: `${faNum(counts.drafts)} پیش‌نویس` },
    { label: 'نمونه‌کار', value: counts.projects, href: '/admin/projects', hint: '' },
    {
      label: 'پیام',
      value: counts.messages,
      href: '/admin/messages',
      hint: counts.unread > 0 ? `${faNum(counts.unread)} خوانده‌نشده` : 'همه خوانده شده',
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-extrabold text-ink">داشبورد</h1>
        <p className="mt-1.5 text-[0.84rem] text-muted">
          خلاصهٔ وضعیت سایت و میان‌برهای کارهای روزمره.
        </p>
      </div>

      {/* شمارنده‌ها */}
      <div className="grid gap-4 sm:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="glass rounded-[var(--radius-md)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40"
          >
            <p className="text-[0.78rem] text-muted">{t.label}</p>
            <strong className="num mt-1 block text-3xl font-extrabold text-ink">
              {faNum(t.value)}
            </strong>
            {t.hint && <p className="mt-1.5 text-[0.72rem] text-brand">{t.hint}</p>}
          </Link>
        ))}
      </div>

      {/* میان‌برها */}
      <div className="glass flex flex-wrap gap-3 rounded-[var(--radius-md)] p-5">
        <ButtonLink href="/admin/posts/new" size="sm">
          + مقالهٔ تازه
        </ButtonLink>
        <ButtonLink href="/admin/projects/new" size="sm" variant="light">
          + نمونه‌کار تازه
        </ButtonLink>
        <ButtonLink href="/admin/messages" size="sm" variant="light">
          دیدن پیام‌ها
        </ButtonLink>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* آخرین مقاله‌ها */}
        <section className="glass rounded-[var(--radius-md)] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[0.95rem] font-bold text-ink">آخرین مقاله‌ها</h2>
            <Link href="/admin/posts" className="text-[0.75rem] font-semibold text-brand hover:underline">
              همه
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <p className="mt-4 text-[0.82rem] text-muted">هنوز مقاله‌ای ساخته نشده است.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
              {recentPosts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/admin/posts/${p.id}`}
                    className="glass-soft flex items-center gap-3 rounded-[var(--radius-sm)] p-3 transition-colors hover:border-brand/35"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.85rem] font-semibold text-ink">
                        {p.title}
                      </span>
                      <span className="num mt-0.5 block text-[0.7rem] text-muted">
                        {faDateTime(p.updatedAt)} · {faNum(p.views)} بازدید
                      </span>
                    </span>
                    {p.published ? (
                      <Badge tone="success">منتشرشده</Badge>
                    ) : (
                      <Badge tone="warning">پیش‌نویس</Badge>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* آخرین پیام‌ها */}
        <section className="glass rounded-[var(--radius-md)] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[0.95rem] font-bold text-ink">آخرین پیام‌ها</h2>
            <Link
              href="/admin/messages"
              className="text-[0.75rem] font-semibold text-brand hover:underline"
            >
              همه
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="mt-4 text-[0.82rem] text-muted">پیامی در صندوق نیست.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
              {recentMessages.map((m) => (
                <li
                  key={m.id}
                  className="glass-soft flex items-center gap-3 rounded-[var(--radius-sm)] p-3"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.85rem] font-semibold text-ink">
                      {m.name}
                    </span>
                    <span className="num mt-0.5 block text-[0.7rem] text-muted">
                      {m.topic} · {faDateTime(m.createdAt)}
                    </span>
                  </span>
                  {!m.read && <Badge tone="brand">تازه</Badge>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
