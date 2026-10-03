import { site } from '@/lib/site';
import { Panel, SectionTitle } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/home/ContactForm';

const channels = [
  { icon: '✉', label: 'ایمیل', value: site.email, href: `mailto:${site.email}` },
  { icon: '☎', label: 'تلفن', value: site.phoneLabel, href: `tel:${site.phone}` },
  { icon: '⌁', label: 'گیت‌هاب', value: 'github.com/Erfanabi', href: site.github },
  { icon: 'in', label: 'لینکدین', value: 'linkedin.com/in/erfansharafi', href: site.linkedin },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 px-4 py-8 sm:px-6">
      <Reveal className="mx-auto max-w-[1140px]">
        <Panel className="relative overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute -start-20 -top-20 size-72 rounded-full bg-brand/15 blur-3xl"
          />

          <div className="grid gap-9 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-success/12 px-3 py-1.5 text-[0.75rem] font-semibold text-success">
                <span aria-hidden className="size-2 rounded-full bg-success animate-pulse-ring" />
                هم‌اکنون آمادهٔ پروژهٔ جدید هستم
              </p>

              <SectionTitle className="mt-4">
                پروژه‌ای در ذهن دارید؟
                <br />
                <span className="gradient-text">بیایید با هم چیز خوبی بسازیم.</span>
              </SectionTitle>

              <p className="mt-4 max-w-md text-[0.95rem] leading-8 text-ink-2">
                ایده‌تان را برایم بفرستید؛ معمولاً{' '}
                <strong className="font-bold text-ink">کمتر از ۲۴ ساعت</strong> پاسخ می‌دهم. مشاورهٔ
                اولیه هم رایگان است.
              </p>

              <ul className="mt-7 flex flex-col gap-2">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="glass-soft flex items-center gap-3 rounded-[var(--radius-sm)] p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40"
                    >
                      <span
                        aria-hidden
                        className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-sm font-bold text-brand"
                      >
                        {c.icon}
                      </span>
                      <span className="flex flex-col">
                        <small className="text-[0.68rem] text-muted">{c.label}</small>
                        <b dir="ltr" className="text-[0.85rem] font-semibold text-ink">
                          {c.value}
                        </b>
                      </span>
                    </a>
                  </li>
                ))}
                <li className="glass-soft flex items-center gap-3 rounded-[var(--radius-sm)] p-3">
                  <span
                    aria-hidden
                    className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-sm font-bold text-brand"
                  >
                    ⌂
                  </span>
                  <span className="flex flex-col">
                    <small className="text-[0.68rem] text-muted">موقعیت</small>
                    <b className="text-[0.85rem] font-semibold text-ink">{site.location}</b>
                  </span>
                </li>
              </ul>
            </div>

            <ContactForm />
          </div>
        </Panel>
      </Reveal>
    </section>
  );
}
