import Image from 'next/image';
import { education, impact, jobs, site } from '@/lib/site';
import { Arrow, Badge, Eyebrow, ExternalButtonLink, Panel, SectionTitle, Tag } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { Counter } from '@/components/Counter';

/** متن‌های سوابق کاری **پررنگ** دارند؛ همین یک نشانه را تبدیل می‌کنیم */
function Bold({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <b key={i} className="font-bold text-ink">
            {part}
          </b>
        ) : (
          part
        )
      )}
    </>
  );
}

export function Timeline() {
  return (
    <section id="work" className="scroll-mt-28 px-4 py-8 sm:px-6">
      <Reveal className="mx-auto max-w-[1140px]">
        <Panel>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>مسیر حرفه‌ای</Eyebrow>
              <SectionTitle>سوابق کاری و پروژه‌ها</SectionTitle>
            </div>
            <ExternalButtonLink href={site.github} size="sm">
              همهٔ پروژه‌ها در گیت‌هاب <Arrow />
            </ExternalButtonLink>
          </div>

          <ol className="mt-9 flex flex-col gap-6 border-s border-line-2 ps-5 sm:ps-7">
            {jobs.map((job) => (
              <li key={job.date} className="relative">
                <span
                  aria-hidden
                  className={`absolute -start-[1.68rem] top-1.5 size-3 rounded-full border-2 border-brand sm:-start-[2.18rem] ${
                    job.current ? 'bg-brand animate-pulse-ring' : 'bg-[var(--bg-1)]'
                  }`}
                />
                <p className="num mb-2 text-[0.75rem] font-semibold text-brand">{job.date}</p>

                <div className="glass-soft rounded-[var(--radius-md)] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-[1rem] font-bold text-ink">{job.role}</h3>
                    {job.current ? (
                      <Badge tone="success">شاغل</Badge>
                    ) : job.link ? (
                      <a
                        href={job.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        dir="ltr"
                        className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-[0.7rem] font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                      >
                        {job.link.label} <Arrow />
                      </a>
                    ) : null}
                  </div>

                  <p className="mt-1.5 text-[0.8rem] text-muted">{job.org}</p>

                  <ul className="mt-4 flex flex-col gap-2.5">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 text-[0.86rem] leading-7 text-ink-2">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                        <span>
                          <Bold text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </Reveal>
    </section>
  );
}

export function Impact() {
  return (
    <section id="impact" className="scroll-mt-28 px-4 py-8 sm:px-6">
      <Reveal className="mx-auto max-w-[1140px]">
        <Panel>
          <Eyebrow>نتایج قابل اندازه‌گیری</Eyebrow>
          <SectionTitle>دستاوردها در محیط واقعی</SectionTitle>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {impact.map((item) => (
              <li key={item.title} className="glass-soft rounded-[var(--radius-md)] p-5">
                <p className="flex items-baseline gap-0.5 text-3xl font-extrabold text-brand">
                  <Counter to={item.to} />
                  {item.unit && <span className="text-xl">{item.unit}</span>}
                </p>
                <h3 className="mt-2 text-[0.92rem] font-bold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-[0.82rem] leading-7 text-muted">{item.desc}</p>
                <p className="mt-3 text-[0.7rem] font-semibold text-brand/80">{item.source}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </Reveal>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="scroll-mt-28 px-4 py-8 sm:px-6">
      <Reveal className="mx-auto max-w-[1140px]">
        <Panel>
          <Eyebrow>پیشینهٔ دانشگاهی</Eyebrow>
          <SectionTitle>تحصیلات</SectionTitle>

          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {education.map((e) => (
              <li key={e.title} className="glass-soft rounded-[var(--radius-md)] p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/80 p-1.5">
                    <Image
                      src="/assets/khayyam-logo.png"
                      alt="نشان دانشگاه خیام"
                      width={512}
                      height={512}
                      className="size-full object-contain"
                    />
                  </span>
                  <span className="num text-[0.75rem] font-semibold text-brand">{e.date}</span>
                </div>
                <h3 className="mt-4 text-[0.98rem] font-bold text-ink">{e.title}</h3>
                <p className="mt-1.5 text-[0.8rem] text-muted">{e.org}</p>
                <p className="mt-3">
                  <Badge tone="brand">{e.badge}</Badge>
                </p>
              </li>
            ))}
          </ul>
        </Panel>
      </Reveal>
    </section>
  );
}
