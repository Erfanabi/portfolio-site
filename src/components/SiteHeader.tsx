'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks, site } from '@/lib/site';
import { cx } from '@/lib/utils';
import { ButtonLink } from '@/components/ui';
import { ThemeToggle } from '@/components/ThemeToggle';

/* شناسهٔ بخش‌های صفحهٔ اصلی، برای نشانه‌گذاری لینک فعال هنگام اسکرول */
const HOME_SECTIONS = ['about', 'projects', 'contact'];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const [progress, setProgress] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === '/';

  /* بستن منو با تغییر مسیر */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* بستن منو با Escape و قفل‌کردن اسکرول پشت منو */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };

    const onClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !burgerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
      document.body.style.overflow = '';
    };
  }, [open]);

  /* نوار پیشرفت اسکرول + بخش فعال */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);

      if (!isHome) return;
      const y = window.scrollY + 160;
      let current = '';
      for (const id of HOME_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveHash(current ? `#${current}` : '');
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isHome]);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return isHome && activeHash === href.slice(1);
    if (href === '/') return isHome && activeHash === '';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* نوار پیشرفت اسکرول */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-right bg-gradient-to-l from-brand to-brand-2 transition-transform duration-100"
        style={{ transform: `scaleX(${progress})` }}
      />

      <header className="no-print fixed inset-x-0 top-0 z-[110] px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="ناوبری اصلی"
          className="glass mx-auto flex max-w-[1140px] items-center gap-3 rounded-full px-3 py-2 sm:px-4"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-full py-1 pe-2"
            aria-label={`${site.name} — خانه`}
          >
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-full bg-brand text-base font-extrabold text-white"
            >
              ع
            </span>
            <span className="hidden flex-col leading-tight xs:flex">
              <strong className="text-[0.85rem] font-extrabold text-ink">{site.name}</strong>
              <small className="text-[0.68rem] text-muted">{site.shortRole}</small>
            </span>
          </Link>

          {/* ناوبری دسکتاپ */}
          <ul className="mx-auto hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cx(
                    'rounded-full px-3 py-2 text-[0.82rem] font-semibold transition-colors',
                    isActive(link.href)
                      ? 'bg-brand-soft text-brand'
                      : 'text-ink-2 hover:bg-brand-soft/60 hover:text-brand'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ms-auto flex items-center gap-1.5 lg:ms-0">
            <ThemeToggle />

            <ButtonLink href="/#contact" size="sm" className="max-md:hidden">
              بیایید صحبت کنیم
            </ButtonLink>

            <button
              ref={burgerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'بستن منو' : 'باز کردن منو'}
              className="grid size-9 place-items-center rounded-full border border-line-2 text-ink transition-colors hover:bg-brand-soft lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-4">
                <span
                  className={cx(
                    'absolute inset-x-0 h-[2px] rounded bg-current transition-all duration-300',
                    open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                  )}
                />
                <span
                  className={cx(
                    'absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded bg-current transition-opacity duration-200',
                    open && 'opacity-0'
                  )}
                />
                <span
                  className={cx(
                    'absolute inset-x-0 h-[2px] rounded bg-current transition-all duration-300',
                    open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                  )}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* ناوبری موبایل */}
        <div
          id="mobile-nav"
          ref={panelRef}
          hidden={!open}
          className="glass mx-auto mt-2 max-w-[1140px] overflow-hidden rounded-[var(--radius-md)] p-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cx(
                    'block rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                    isActive(link.href)
                      ? 'bg-brand-soft text-brand'
                      : 'text-ink-2 hover:bg-brand-soft/60'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/#contact" className="mt-2 w-full" onClick={() => setOpen(false)}>
            بیایید صحبت کنیم
          </ButtonLink>
        </div>
      </header>
    </>
  );
}
