import { services } from '@/lib/site';
import { Arrow, ButtonLink, Eyebrow, Panel, SectionTitle } from '@/components/ui';
import { Reveal } from '@/components/Reveal';

const stats = [
  { icon: '◆', value: '۴+', label: 'سال تجربه' },
  { icon: '◇', value: '۴', label: 'پلتفرم منتشرشده' },
  { icon: '◈', value: '۹۰+', label: 'امتیاز لایت‌هاوس' },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-28 px-4 py-8 sm:px-6">
      <Reveal className="mx-auto max-w-[1140px]">
        <Panel>
          <Eyebrow>دربارهٔ من</Eyebrow>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionTitle>
                مهندسی با دقت
                <br />
                ساختن با هدف
              </SectionTitle>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="glass-soft rounded-[var(--radius-sm)] px-3 py-4 text-center"
                  >
                    <span aria-hidden className="text-sm text-brand">
                      {s.icon}
                    </span>
                    <strong className="num mt-1 block text-xl font-extrabold text-ink">
                      {s.value}
                    </strong>
                    <small className="text-[0.68rem] leading-tight text-muted">{s.label}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-4">
              <p className="text-[0.95rem] leading-8 text-ink-2">
                مهندس فرانت‌اند با بیش از ۴ سال تجربه در ساخت و انتشار پلتفرم‌های آمادهٔ تولید —
                شامل CRM، ERP، SaaS و فروشگاه‌های اینترنتی. در چند پروژه به‌عنوان تنها معمارِ سیستم
                فرانت‌اند کار کرده‌ام، با تمرکز جدی روی کیفیت کد و طراحی قابل نگهداری.
              </p>
              <p className="text-[0.95rem] leading-8 text-ink-2">
                تسلط بالا بر React، Next.js و TypeScript، همراه با تجربهٔ گستردهٔ یکپارچه‌سازی سمت
                سرور با Node.js، Express و REST — و پیاده‌سازی قابلیت‌های مبتنی بر هوش مصنوعی در
                محیط عملیاتی.
              </p>
              <ButtonLink href="/#contact" variant="light" size="sm">
                بیشتر بدانید <Arrow />
              </ButtonLink>
            </div>
          </div>
        </Panel>
      </Reveal>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-28 px-4 py-8 sm:px-6">
      <Reveal className="mx-auto max-w-[1140px]">
        <Panel>
          <Eyebrow>چه کاری انجام می‌دهم</Eyebrow>
          <SectionTitle>خدمات من</SectionTitle>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li
                key={s.title}
                className="glass-soft group rounded-[var(--radius-md)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35"
              >
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-xl bg-brand-soft text-lg text-brand"
                >
                  {s.icon}
                </span>
                <h3 className="mt-4 text-[0.98rem] font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.85rem] leading-7 text-muted">{s.desc}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </Reveal>
    </section>
  );
}
