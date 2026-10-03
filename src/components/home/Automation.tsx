import { automation } from '@/lib/site';
import { Arrow, ButtonLink, Eyebrow, Panel, SectionTitle } from '@/components/ui';
import { Reveal } from '@/components/Reveal';

export function Automation() {
  return (
    <section id="automation" className="scroll-mt-28 px-4 py-8 sm:px-6">
      <Reveal className="mx-auto max-w-[1140px]">
        <Panel className="relative overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute -end-24 -top-24 size-72 rounded-full bg-brand/15 blur-3xl"
          />

          <Eyebrow>راه‌حل برای کسب‌وکارها</Eyebrow>
          <SectionTitle>کارهای تکراری‌تان را سیستمی می‌کنم</SectionTitle>
          <p className="mt-4 max-w-3xl text-[0.95rem] leading-8 text-ink-2">
            بیشتر کسب‌وکارها سفارش را در واتساپ می‌گیرند، فاکتور را دستی می‌نویسند و نوبت‌ها را روی
            کاغذ نگه می‌دارند. من این کارها را به یک سیستم منتقل می‌کنم تا خودشان انجام شوند.
          </p>

          {/* مقایسهٔ قبل و بعد */}
          <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <div className="glass-soft rounded-[var(--radius-md)] border-s-[3px] border-s-danger/60 p-5">
              <h3 className="flex flex-wrap items-center gap-2 text-[0.95rem] font-bold text-ink">
                <span className="rounded-full bg-danger/12 px-2.5 py-0.5 text-[0.7rem] font-semibold text-danger">
                  الان
                </span>
                کار چطور پیش می‌رود
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {automation.before.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.86rem] leading-7 text-muted">
                    <span aria-hidden className="mt-0.5 shrink-0 text-danger">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              aria-hidden
              className="grid place-items-center text-2xl text-brand lg:px-2 max-lg:rotate-90"
            >
              <span className="rtl:-scale-x-100">→</span>
            </div>

            <div className="glass-soft rounded-[var(--radius-md)] border-s-[3px] border-s-success/60 p-5">
              <h3 className="flex flex-wrap items-center gap-2 text-[0.95rem] font-bold text-ink">
                <span className="rounded-full bg-success/12 px-2.5 py-0.5 text-[0.7rem] font-semibold text-success">
                  بعد
                </span>
                کار چطور پیش می‌رود
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {automation.after.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.86rem] leading-7 text-ink-2">
                    <span aria-hidden className="mt-0.5 shrink-0 text-success">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* چه چیزهایی خودکار می‌شود */}
          <h3 className="mt-12 text-lg font-extrabold text-ink">چه چیزهایی را خودکار می‌کنم</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {automation.cards.map((c) => (
              <li
                key={c.title}
                className="glass-soft rounded-[var(--radius-md)] p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span aria-hidden className="text-2xl">
                  {c.icon}
                </span>
                <h4 className="mt-3 text-[0.95rem] font-bold text-ink">{c.title}</h4>
                <p className="mt-2 text-[0.84rem] leading-7 text-muted">{c.desc}</p>
              </li>
            ))}
          </ul>

          {/* مسیر همکاری */}
          <h3 className="mt-12 text-lg font-extrabold text-ink">چطور کار می‌کنم</h3>
          <ol className="mt-5 grid gap-5 md:grid-cols-3">
            {automation.steps.map((s) => (
              <li key={s.n} className="flex gap-3.5">
                <span
                  aria-hidden
                  className="num grid size-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-white"
                >
                  {s.n}
                </span>
                <div>
                  <h4 className="text-[0.95rem] font-bold text-ink">{s.title}</h4>
                  <p className="mt-1.5 text-[0.84rem] leading-7 text-muted">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-start gap-2">
            <ButtonLink href="/#contact" size="lg">
              بیایید دربارهٔ کسب‌وکارتان حرف بزنیم <Arrow />
            </ButtonLink>
            <p className="text-xs text-muted">مشاورهٔ اولیه رایگان است.</p>
          </div>
        </Panel>
      </Reveal>
    </section>
  );
}
