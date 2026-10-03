import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Markdown } from '@/components/Markdown';
import { ShareRow } from '@/components/ShareRow';
import { ViewPing } from '@/components/ViewPing';
import { Arrow, ButtonLink, Panel, Tag } from '@/components/ui';
import { getPostBySlug, getRelatedPosts } from '@/lib/queries';
import { prisma } from '@/lib/prisma';
import { faDate, faNum, parseList, truncate } from '@/lib/utils';
import { site } from '@/lib/site';

export const revalidate = 600;

/* نشانی مقاله‌های منتشرشده از پیش ساخته می‌شود */
export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
    take: 50,
  });
  return posts.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));

  if (!post) return { title: 'مقاله پیدا نشد' };

  const description = truncate(post.excerpt, 160);

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      publishedTime: (post.publishedAt ?? post.createdAt).toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      tags: parseList(post.tags),
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: post.title, description },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));

  if (!post) notFound();

  const tags = parseList(post.tags);
  const related = await getRelatedPosts(post.id, tags, 3);
  const published = post.publishedAt ?? post.createdAt;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: published.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Person', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    ...(post.coverImage ? { image: post.coverImage } : {}),
  };

  return (
    <>
      <ViewPing slug={post.slug} />

      <main id="main" className="px-4 pb-8 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-[800px]">
          {/* مسیر صفحه، تا کاربر بداند کجاست و راه برگشت داشته باشد */}
          <nav aria-label="مسیر صفحه" className="mb-4 px-1">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] text-muted">
              <li>
                <Link href="/" className="hover:text-brand">
                  خانه
                </Link>
              </li>
              <li aria-hidden className="rtl:-scale-x-100">
                /
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand">
                  بلاگ
                </Link>
              </li>
              <li aria-hidden className="rtl:-scale-x-100">
                /
              </li>
              <li aria-current="page" className="truncate text-ink-2">
                {post.title}
              </li>
            </ol>
          </nav>

          <article>
            <Panel>
              <header>
                {tags.length > 0 && (
                  <ul className="mb-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li key={tag}>
                        <Link href={`/blog?tag=${encodeURIComponent(tag)}`}>
                          <Tag className="transition-colors hover:bg-brand hover:text-white">
                            {tag}
                          </Tag>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <h1 className="text-balance text-[clamp(1.6rem,5vw,2.3rem)] font-extrabold leading-[1.3] text-ink">
                  {post.title}
                </h1>

                <div className="num mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem] text-muted">
                  <time dateTime={published.toISOString()}>{faDate(published)}</time>
                  <span aria-hidden>·</span>
                  <span>{faNum(post.readMinutes)} دقیقه مطالعه</span>
                  <span aria-hidden>·</span>
                  <span>{faNum(post.views)} بازدید</span>
                </div>

                <p className="mt-5 border-s-[3px] border-s-brand ps-4 text-[0.95rem] leading-8 text-ink-2">
                  {post.excerpt}
                </p>
              </header>

              {post.coverImage && (
                <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-[var(--radius-md)] bg-brand-soft">
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 840px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
              )}

              <Markdown className="mt-8">{post.content}</Markdown>

              <footer className="mt-10 border-t border-line-2 pt-6">
                <ShareRow title={post.title} path={`/blog/${post.slug}`} />
              </footer>
            </Panel>
          </article>

          {/* مقاله‌های مرتبط */}
          {related.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-6">
              <Panel>
                <h2 id="related-heading" className="text-lg font-extrabold text-ink">
                  خواندن بعدی
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/blog/${r.slug}`}
                        className="glass-soft group flex flex-col gap-1.5 rounded-[var(--radius-sm)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/35"
                      >
                        <span className="text-[0.92rem] font-bold text-ink transition-colors group-hover:text-brand">
                          {r.title}
                        </span>
                        <span className="line-clamp-2 text-[0.8rem] leading-6 text-muted">
                          {r.excerpt}
                        </span>
                        <span className="num text-[0.7rem] text-muted">
                          {faNum(r.readMinutes)} دقیقه مطالعه
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Panel>
            </section>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/blog" variant="light">
              <span aria-hidden className="rtl:-scale-x-100">
                ←
              </span>{' '}
              بازگشت به بلاگ
            </ButtonLink>
            <ButtonLink href="/#contact">
              پروژه‌ای دارید؟ حرف بزنیم <Arrow />
            </ButtonLink>
          </div>
        </div>
      </main>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
