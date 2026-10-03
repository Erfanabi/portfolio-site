import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Badge, ButtonLink, EmptyState } from '@/components/ui';
import { PublishToggle } from '@/components/admin/PublishToggle';
import { faDateTime, faNum, parseList } from '@/lib/utils';

export const metadata = { title: 'مقاله‌ها' };

export default async function AdminPostsPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');

  const posts = await prisma.post.findMany({ orderBy: { updatedAt: 'desc' } });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-ink">مقاله‌ها</h1>
          <p className="num mt-1 text-[0.8rem] text-muted">
            {faNum(posts.length)} مقاله — {faNum(posts.filter((p) => !p.published).length)}{' '}
            پیش‌نویس
          </p>
        </div>
        <ButtonLink href="/admin/posts/new" size="sm">
          + مقالهٔ تازه
        </ButtonLink>
      </div>

      {posts.length === 0 ? (
        <EmptyState
          icon="✦"
          title="هنوز مقاله‌ای نساخته‌اید"
          description="اولین یادداشت‌تان را بنویسید؛ می‌توانید اول پیش‌نویس نگه دارید و بعد منتشر کنید."
          action={
            <ButtonLink href="/admin/posts/new" size="sm" className="mt-2">
              نوشتن اولین مقاله
            </ButtonLink>
          }
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="glass flex flex-col gap-3 rounded-[var(--radius-md)] p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {post.published ? (
                    <Badge tone="success">منتشرشده</Badge>
                  ) : (
                    <Badge tone="warning">پیش‌نویس</Badge>
                  )}
                  {post.featured && <Badge tone="brand">شاخص</Badge>}
                </div>

                <h2 className="mt-2 truncate text-[0.92rem] font-bold text-ink">
                  <Link href={`/admin/posts/${post.id}`} className="hover:text-brand">
                    {post.title}
                  </Link>
                </h2>

                <p className="num mt-1 text-[0.72rem] text-muted">
                  ویرایش: {faDateTime(post.updatedAt)} · {faNum(post.views)} بازدید ·{' '}
                  {faNum(post.readMinutes)} دقیقه
                </p>

                {parseList(post.tags).length > 0 && (
                  <p className="mt-1.5 text-[0.7rem] text-brand/80">
                    {parseList(post.tags).join(' · ')}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <PublishToggle
                  kind="posts"
                  id={post.id}
                  published={post.published}
                  title={post.title}
                />

                {post.published && (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="rounded-full px-3 py-2 text-[0.75rem] font-semibold text-ink-2 transition-colors hover:text-brand"
                  >
                    دیدن ↗
                  </Link>
                )}

                <Link
                  href={`/admin/posts/${post.id}`}
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
