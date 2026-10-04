import Image from 'next/image';
import { site, trustedBy } from '@/lib/site';
import { Arrow, ButtonLink } from '@/components/ui';

const floatTech = [
  { name: 'React', slug: 'react/61DAFB', pos: 'top-6 -start-3', delay: '0s' },
  { name: 'Next.js', slug: 'nextdotjs/8E8EA0', pos: 'top-1/3 -end-4', delay: '0.9s' },
  { name: 'TypeScript', slug: 'typescript/3178C6', pos: 'bottom-24 -start-5', delay: '1.8s' },
  { name: 'Tailwind CSS', slug: 'tailwindcss/06B6D4', pos: 'bottom-8 end-6', delay: '2.6s' },
];

export function Hero() {
  return (
    <section id="home" className="px-4 pb-6 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto grid max-w-[1140px] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <p className="mb-2 text-sm font-semibold text-brand">سلام، من</p>
          <h1 className="text-[clamp(2.2rem,7vw,3.4rem)] font-extrabold leading-[1.15] text-ink">
            {site.name}
          </h1>
          <p className="gradient-text mt-1 text-[clamp(1.1rem,3.6vw,1.6rem)] font-extrabold leading-snug">
            {site.role}
          </p>

          <p className="mt-5 max-w-xl text-[0.97rem] leading-8 text-ink-2">
            پلتفرم‌های وبِ آمادهٔ تولید می‌سازم و منتشر می‌کنم؛ سریع، در دسترس و با معماری تمیز —
            با React، Next.js و TypeScript.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/#projects" variant="dark" size="lg">
              مشاهدهٔ نمونه‌کارها <Arrow />
            </ButtonLink>
            <ButtonLink href={site.resume} variant="light" size="lg" download prefetch={false}>
              دانلود رزومه <span aria-hidden>↓</span>
            </ButtonLink>
          </div>

          <p className="mt-7 text-xs font-semibold text-muted">همکاری داشته‌ام با</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {trustedBy.map((co) => (
              <li key={co} className="text-[0.82rem] font-semibold text-ink-2/70">
                {co}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="relative mx-auto w-full max-w-[380px]">
            <div className="glass overflow-hidden rounded-[var(--radius-lg)] p-2">
              <Image
                src="/assets/profile.jpg"
                alt={`عکس ${site.name}`}
                width={640}
                height={640}
                priority
                sizes="(max-width: 768px) 90vw, 380px"
                className="aspect-square w-full rounded-[var(--radius-md)] object-cover"
              />
            </div>

            {/* نشان سال‌های تجربه */}
            <div className="glass absolute -bottom-4 start-2 flex items-center gap-2 rounded-2xl px-3.5 py-2.5">
              <strong className="num text-xl font-extrabold text-brand">۴+</strong>
              <span className="text-[0.7rem] leading-tight text-muted">
                سال
                <br />
                تجربه
              </span>
            </div>

            {/* نشان امتیاز عملکرد */}
            <div className="glass absolute -top-4 end-0 rounded-2xl px-3.5 py-2.5">
              <p className="text-[0.65rem] text-muted">امتیاز عملکرد</p>
              <strong className="num text-lg font-extrabold text-brand">۹۰+</strong>
              <svg
                viewBox="0 0 100 34"
                preserveAspectRatio="none"
                aria-hidden
                className="mt-1 h-5 w-20"
              >
                <polyline
                  points="0,30 18,24 34,26 52,14 70,16 86,6 100,3"
                  fill="none"
                  stroke="var(--violet)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* آیکون‌های شناور — تزئینی، روی موبایل پنهان */}
            <div aria-hidden className="hidden sm:block">
              {floatTech.map((tech) => (
                <span
                  key={tech.name}
                  className={`glass animate-float absolute ${tech.pos} grid size-11 place-items-center rounded-2xl`}
                  style={{ ['--d' as string]: tech.delay }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://cdn.simpleicons.org/${tech.slug}`}
                    alt=""
                    width={22}
                    height={22}
                    loading="lazy"
                    className="size-[22px]"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
