import Link from 'next/link';
import { navLinks, site } from '@/lib/site';
import { faNum } from '@/lib/utils';

const year = faNum(
  new Intl.DateTimeFormat('fa-IR', { year: 'numeric', timeZone: 'Asia/Tehran' })
    .format(new Date())
    .replace(/\D/g, '')
);

export function SiteFooter() {
  return (
    <footer className="no-print mt-16 border-t border-line-2 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid size-9 place-items-center rounded-full bg-brand text-base font-extrabold text-white"
              >
                ع
              </span>
              <span className="flex flex-col leading-tight">
                <strong className="text-sm font-extrabold text-ink">{site.name}</strong>
                <small className="text-xs text-muted">{site.shortRole}</small>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-muted">
              پلتفرم‌های وبِ آمادهٔ تولید می‌سازم و منتشر می‌کنم؛ سریع، در دسترس و با معماری تمیز.
            </p>
          </div>

          <nav aria-label="ناوبری پانوشت">
            <h2 className="mb-3 text-xs font-bold text-ink">پیوندها</h2>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 text-xs font-bold text-ink">تماس</h2>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  dir="ltr"
                  className="transition-colors hover:text-brand"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  dir="ltr"
                  className="transition-colors hover:text-brand"
                >
                  {site.phoneLabel}
                </a>
              </li>
              <li className="flex gap-3 pt-1">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand"
                >
                  گیت‌هاب
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand"
                >
                  لینکدین
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-line-2 pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {year} — {site.name}
          </p>
          <p>ساخته‌شده با Next.js و Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
