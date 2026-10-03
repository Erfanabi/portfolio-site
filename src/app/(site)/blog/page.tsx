import type { Metadata } from 'next';
import Link from 'next/link';
import { PostCard } from '@/components/PostCard';
import { BlogSearch } from '@/components/BlogSearch';
import { EmptyState, Eyebrow, Panel, SectionTitle } from '@/components/ui';
import { getAllTags, getPublishedPosts } from '@/lib/queries';
import { cx, faNum } from '@/lib/utils';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'بلاگ',
  description:
    'یادداشت‌هایی دربارهٔ فرانت‌اند، Next.js، معماری رابط کاربری و اتوماسیون فرآیندهای کسب‌وکار.',
  alternates: { canonical: '/blog' },
};

type SearchParams = Promise<{ page?: string; tag?: string; q?: string }>;

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const tag = sp.tag?.trim() || undefined;
  const q = sp.q?.trim() || undefined;

  const [{ items, total, pages }, tags] = await Promise.all([
    getPublishedPosts({ page, tag, q }),
    getAllTags(),
  ]);

  /* ساخت نشانی صفحه‌بندی با نگه‌داشتن فیلترهای فعال */
  const pageHref = (n: number) => {
    const params = new URLSearchParams();
    if (tag) params.set('tag', tag);
    if (q) params.set('q', q);
    if (n > 1) params.set('page', String(n));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : '/blog';
  };

  return (
    <>

      <main id="main" className="px-4 pb-8 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-[1140px]">
          <Panel>
            <Eyebrow>یادداشت‌ها</Eyebrow>
            <SectionTitle>بلاگ</SectionTitle>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-8 text-ink-2">
              چیزهایی که در مسیر ساختن سیستم‌های واقعی یاد گرفته‌ام — فرانت‌اند، Next.js، معماری
              رابط کاربری و اتوماسیون.
            </p>

            <div className="mt-7 flex flex-col gap-4">
              <BlogSearch initialQuery={q ?? ''} tag={tag} />

              {tags.length > 0 && (
                <nav aria-label="فیلتر برچسب‌ها">
                  <ul className="flex flex-wrap gap-2">
                    <li>
                      <Link
                        href={q ? `/blog?q=${encodeURIComponent(q)}` : '/blog'}
                        aria-current={!tag ? 'true' : undefined}
                        className={cx(
                          'inline-flex rounded-full px-3 py-1.5 text-[0.75rem] font-semibold transition-colors',
                          !tag
                            ? 'bg-brand text-white'
                            : 'glass-soft text-ink-2 hover:text-brand'
                        )}
                      >
                        همه
                      </Link>
                    </li>
                    {tags.map(({ tag: name, count }) => (
                      <li key={name}>
                        <Link
                          href={`/blog?tag=${encodeURIComponent(name)}`}
                          aria-current={tag === name ? 'true' : undefined}
                          className={cx(
                            'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.75rem] font-semibold transition-colors',
                            tag === name
                              ? 'bg-brand text-white'
                              : 'glass-soft text-ink-2 hover:text-brand'
                          )}
                        >
                          {name}
                          <span className="num opacity-60">{faNum(count)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            {/* شمارش نتیجه‌ها — برای صفحه‌خوان هم اعلام می‌شود */}
            <p role="status" className="num mt-6 text-[0.78rem] text-muted">
              {total > 0
                ? `${faNum(total)} مقاله${tag ? ` با برچسب «${tag}»` : ''}${q ? ` برای «${q}»` : ''}`
                : 'نتیجه‌ای پیدا نشد'}
            </p>

            {items.length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="mt-4">
                <EmptyState
                  icon="✦"
                  title={q || tag ? 'چیزی با این جستجو پیدا نشد' : 'هنوز مقاله‌ای منتشر نشده'}
                  description={
                    q || tag
                      ? 'عبارت دیگری را امتحان کنید یا فیلتر برچسب را بردارید.'
                      : 'به‌زودی اولین یادداشت‌ها اینجا منتشر می‌شوند.'
                  }
                  action={
                    (q || tag) && (
                      <Link
                        href="/blog"
                        className="mt-1 text-[0.8rem] font-semibold text-brand hover:underline"
                      >
                        برداشتن فیلترها
                      </Link>
                    )
                  }
                />
              </div>
            )}

            {/* صفحه‌بندی */}
            {pages > 1 && (
              <nav aria-label="صفحه‌بندی مقاله‌ها" className="mt-9 flex justify-center">
                <ul className="flex items-center gap-1.5">
                  <li>
                    {page > 1 ? (
                      <Link
                        href={pageHref(page - 1)}
                        rel="prev"
                        className="glass-soft inline-flex items-center rounded-full px-3.5 py-2 text-[0.78rem] font-semibold text-ink-2 hover:text-brand"
                      >
                        قبلی
                      </Link>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-3.5 py-2 text-[0.78rem] font-semibold text-muted/50">
                        قبلی
                      </span>
                    )}
                  </li>

                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                    <li key={n}>
                      <Link
                        href={pageHref(n)}
                        aria-current={n === page ? 'page' : undefined}
                        className={cx(
                          'num inline-flex size-9 items-center justify-center rounded-full text-[0.8rem] font-semibold transition-colors',
                          n === page ? 'bg-brand text-white' : 'glass-soft text-ink-2 hover:text-brand'
                        )}
                      >
                        {faNum(n)}
                      </Link>
                    </li>
                  ))}

                  <li>
                    {page < pages ? (
                      <Link
                        href={pageHref(page + 1)}
                        rel="next"
                        className="glass-soft inline-flex items-center rounded-full px-3.5 py-2 text-[0.78rem] font-semibold text-ink-2 hover:text-brand"
                      >
                        بعدی
                      </Link>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-3.5 py-2 text-[0.78rem] font-semibold text-muted/50">
                        بعدی
                      </span>
                    )}
                  </li>
                </ul>
              </nav>
            )}
          </Panel>
        </div>
      </main>

    </>
  );
}
