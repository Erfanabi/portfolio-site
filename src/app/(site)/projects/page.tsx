import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { EmptyState, Eyebrow, Panel, SectionTitle } from '@/components/ui';
import { getPublishedProjects } from '@/lib/queries';
import { projectCategories } from '@/lib/site';
import { cx, faNum } from '@/lib/utils';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'نمونه‌کارها',
  description:
    'پلتفرم‌ها و وب‌اپلیکیشن‌هایی که ساخته و منتشر کرده‌ام — CRM، ERP، فروشگاه اینترنتی و سیستم‌های اتوماسیون.',
  alternates: { canonical: '/projects' },
};

type SearchParams = Promise<{ category?: string }>;

export default async function ProjectsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const category = sp.category?.trim() || 'all';

  /* همهٔ پروژه‌ها را می‌گیریم تا هم شمارش هر دسته را داشته باشیم، هم فیلتر را */
  const all = await getPublishedProjects();
  const items = category === 'all' ? all : all.filter((p) => p.category === category);

  const counts = new Map<string, number>();
  for (const p of all) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);

  /* دسته‌هایی که پروژه‌ای ندارند نشان داده نمی‌شوند */
  const available = projectCategories.filter((c) => counts.has(c.value));

  return (
    <>

      <main id="main" className="px-4 pb-8 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-[1140px]">
          <Panel>
            <Eyebrow>کارهایی که ساخته‌ام</Eyebrow>
            <SectionTitle>نمونه‌کارها</SectionTitle>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-8 text-ink-2">
              هر کدام از این‌ها یک سیستم واقعی است که در حال استفاده است — نه یک دموی نمایشی. روی هر
              مورد کلیک کنید تا شرح کار، نقش من و تکنولوژی‌ها را ببینید.
            </p>

            {available.length > 1 && (
              <nav aria-label="فیلتر دسته‌ها" className="mt-7">
                <ul className="flex flex-wrap gap-2">
                  <li>
                    <Link
                      href="/projects"
                      aria-current={category === 'all' ? 'true' : undefined}
                      className={cx(
                        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold transition-colors',
                        category === 'all'
                          ? 'bg-brand text-white'
                          : 'glass-soft text-ink-2 hover:text-brand'
                      )}
                    >
                      همه
                      <span className="num opacity-60">{faNum(all.length)}</span>
                    </Link>
                  </li>
                  {available.map((c) => (
                    <li key={c.value}>
                      <Link
                        href={`/projects?category=${c.value}`}
                        aria-current={category === c.value ? 'true' : undefined}
                        className={cx(
                          'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold transition-colors',
                          category === c.value
                            ? 'bg-brand text-white'
                            : 'glass-soft text-ink-2 hover:text-brand'
                        )}
                      >
                        {c.label}
                        <span className="num opacity-60">{faNum(counts.get(c.value) ?? 0)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {items.length > 0 ? (
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : (
              <div className="mt-7">
                <EmptyState
                  icon="◫"
                  title={
                    all.length === 0 ? 'هنوز نمونه‌کاری منتشر نشده' : 'در این دسته پروژه‌ای نیست'
                  }
                  description={
                    all.length === 0
                      ? 'به‌زودی پروژه‌ها اینجا اضافه می‌شوند. تا آن موقع می‌توانید سوابق کاری را ببینید.'
                      : 'دستهٔ دیگری را انتخاب کنید.'
                  }
                  action={
                    <Link
                      href={all.length === 0 ? '/#work' : '/projects'}
                      className="mt-1 text-[0.8rem] font-semibold text-brand hover:underline"
                    >
                      {all.length === 0 ? 'دیدن سوابق کاری' : 'دیدن همهٔ پروژه‌ها'}
                    </Link>
                  }
                />
              </div>
            )}
          </Panel>
        </div>
      </main>

    </>
  );
}
