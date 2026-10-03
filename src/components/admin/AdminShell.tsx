'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cx } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

const links = [
  { href: '/admin', label: 'داشبورد', icon: '◉' },
  { href: '/admin/posts', label: 'مقاله‌ها', icon: '✦' },
  { href: '/admin/projects', label: 'نمونه‌کارها', icon: '◫' },
  { href: '/admin/messages', label: 'پیام‌ها', icon: '✉' },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  /* صفحهٔ ورود نباید منوی پنل را داشته باشد */
  if (pathname === '/admin/login') return <>{children}</>;

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  async function signOut() {
    setSigningOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.replace('/admin/login');
      router.refresh();
    }
  }

  const nav = (
    <nav aria-label="منوی پنل" className="flex flex-col gap-1">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={() => setOpen(false)}
          aria-current={isActive(l.href) ? 'page' : undefined}
          className={cx(
            'flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[0.85rem] font-semibold transition-colors',
            isActive(l.href)
              ? 'bg-brand text-white'
              : 'text-ink-2 hover:bg-brand-soft hover:text-brand'
          )}
        >
          <span aria-hidden className="text-sm">
            {l.icon}
          </span>
          {l.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-dvh">
      {/* نوار بالا */}
      <header className="glass sticky top-0 z-50 flex items-center gap-3 border-b border-line-2 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="admin-nav"
          aria-label={open ? 'بستن منو' : 'باز کردن منو'}
          className="grid size-9 place-items-center rounded-xl border border-line-2 text-ink lg:hidden"
        >
          <span aria-hidden>☰</span>
        </button>

        <Link href="/admin" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-xl bg-brand text-sm font-extrabold text-white"
          >
            ع
          </span>
          <strong className="text-[0.88rem] font-extrabold text-ink">پنل مدیریت</strong>
        </Link>

        <div className="ms-auto flex items-center gap-2">
          <Link
            href="/"
            className="hidden rounded-full px-3 py-1.5 text-[0.78rem] font-semibold text-ink-2 transition-colors hover:text-brand sm:inline-flex"
          >
            دیدن سایت
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="rounded-full bg-danger/12 px-3.5 py-2 text-[0.78rem] font-semibold text-danger transition-colors hover:bg-danger/20 disabled:opacity-60"
          >
            {signingOut ? 'خروج…' : 'خروج'}
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1240px] gap-5 px-4 py-5">
        {/* منوی کناری — دسکتاپ */}
        <aside className="glass sticky top-[4.6rem] hidden h-fit w-56 shrink-0 rounded-[var(--radius-md)] p-3 lg:block">
          {nav}
        </aside>

        <main id="main" className="min-w-0 flex-1">
          {/* منوی کشویی — موبایل */}
          <div
            id="admin-nav"
            hidden={!open}
            className="glass mb-4 rounded-[var(--radius-md)] p-3 lg:hidden"
          >
            {nav}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
