import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Markdown } from '@/components/Markdown';
import { Arrow, Badge, ButtonLink, ExternalButtonLink, Panel, Tag } from '@/components/ui';
import { getProjectBySlug } from '@/lib/queries';
import { prisma } from '@/lib/prisma';
import { categoryLabel, site } from '@/lib/site';
import { parseList, truncate } from '@/lib/utils';

export const revalidate = 600;

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true },
    take: 50,
  });
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(decodeURIComponent(slug));

  if (!project) return { title: 'پروژه پیدا نشد' };

  const description = truncate(project.summary, 160);

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: project.title,
      description,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(decodeURIComponent(slug));

  if (!project) notFound();

  const stack = parseList(project.stack);

  const facts = [
    project.client && { label: 'کارفرما', value: project.client },
    project.role && { label: 'نقش من', value: project.role },
    project.year && { label: 'سال', value: project.year },
    { label: 'دسته', value: categoryLabel(project.category) },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    author: { '@type': 'Person', name: site.name, url: site.url },
    ...(project.liveUrl ? { url: project.liveUrl } : {}),
    ...(project.coverImage ? { image: project.coverImage } : {}),
  };

  return (
    <>

      <main id="main" className="px-4 pb-8 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-[900px]">
          <nav aria-label="مسیر صفحه" className="mb-4 px-1">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] text-muted">
              <li>
                <Link href="/" className="hover:text-brand">
                  خانه
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/projects" className="hover:text-brand">
                  نمونه‌کارها
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="truncate text-ink-2">
                {project.title}
              </li>
            </ol>
          </nav>

          <article>
            <Panel>
              <header>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge tone="brand">{categoryLabel(project.category)}</Badge>
                  {project.featured && <Badge tone="warning">پروژهٔ شاخص</Badge>}
                </div>

                <h1 className="text-balance text-[clamp(1.6rem,5vw,2.3rem)] font-extrabold leading-[1.3] text-ink">
                  {project.title}
                </h1>

                <p className="mt-4 text-[0.97rem] leading-8 text-ink-2">{project.summary}</p>

                {(project.liveUrl || project.repoUrl) && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <ExternalButtonLink href={project.liveUrl} variant="primary">
                        مشاهدهٔ سایت <Arrow />
                      </ExternalButtonLink>
                    )}
                    {project.repoUrl && (
                      <ExternalButtonLink href={project.repoUrl}>
                        کد روی گیت‌هاب <Arrow />
                      </ExternalButtonLink>
                    )}
                  </div>
                )}
              </header>

              {project.coverImage && (
                <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-[var(--radius-md)] bg-brand-soft">
                  <Image
                    src={project.coverImage}
                    alt={`نمایی از ${project.title}`}
                    fill
                    priority
                    sizes="(max-width: 940px) 100vw, 900px"
                    className="object-cover"
                  />
                </div>
              )}

              {/* مشخصات پروژه در یک نگاه */}
              <dl className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {facts.map((f) => (
                  <div key={f.label} className="glass-soft rounded-[var(--radius-sm)] p-3.5">
                    <dt className="text-[0.68rem] text-muted">{f.label}</dt>
                    <dd className="mt-1 text-[0.85rem] font-bold text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>

              {stack.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-[0.8rem] font-bold text-ink">تکنولوژی‌های استفاده‌شده</h2>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {stack.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Markdown className="mt-8">{project.content}</Markdown>
            </Panel>
          </article>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/projects" variant="light">
              <span aria-hidden className="rtl:-scale-x-100">
                ←
              </span>{' '}
              همهٔ نمونه‌کارها
            </ButtonLink>
            <ButtonLink href="/#contact">
              پروژهٔ مشابهی دارید؟ <Arrow />
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
