import { techRows } from '@/lib/site';
import { Eyebrow, Panel, SectionTitle } from '@/components/ui';
import { Reveal } from '@/components/Reveal';

export function Tech() {
  return (
    <section id="tech" className="scroll-mt-28 px-4 py-8 sm:px-6">
      <Reveal className="mx-auto max-w-[1140px]">
        <Panel className="overflow-hidden">
          <Eyebrow>ابزارها و مهارت‌ها</Eyebrow>
          <SectionTitle>تکنولوژی‌هایی که بلدم</SectionTitle>

          <div className="mt-8 flex flex-col gap-4">
            {techRows.map((row, i) => (
              <div
                key={i}
                className="marquee -mx-2 overflow-hidden px-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
              >
                <div
                  className="marquee-track flex w-max gap-3"
                  data-dir={row.dir}
                  style={{ ['--speed' as string]: `${row.speed}s` }}
                >
                  {/* فهرست دو بار تکرار می‌شود تا حلقه بی‌وقفه به نظر برسد */}
                  {[...row.items, ...row.items].map(([name, slug, color], j) => (
                    <span
                      key={`${name}-${j}`}
                      className="glass-soft flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2"
                      {...(j >= row.items.length ? { 'aria-hidden': true } : {})}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://cdn.simpleicons.org/${slug}/${color}`}
                        alt=""
                        width={18}
                        height={18}
                        loading="lazy"
                        className="size-[18px]"
                      />
                      <span className="whitespace-nowrap text-[0.8rem] font-semibold text-ink-2">
                        {name}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-center text-[0.72rem] text-muted">
            برای توقف، نشانگر را روی نوار نگه دارید
          </p>
        </Panel>
      </Reveal>
    </section>
  );
}
