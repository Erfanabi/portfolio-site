'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  /* صفحهٔ ورود نباید نوار پنل را داشته باشد */
  if (pathname === '/admin/login') return <>{children}</>;

  async function signOut() {
    setSigningOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.replace('/admin/login');
      router.refresh();
    }
  }

  return (
    <div className="min-h-dvh">
      {/* نوار بالا */}
      <header className="glass sticky top-0 z-50 flex items-center gap-3 border-b border-line-2 px-4 py-3">
        <Link href="/admin/messages" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-xl bg-brand text-sm font-extrabold text-white"
          >
            ع
          </span>
          <strong className="text-[0.88rem] font-extrabold text-ink">پیام‌ها</strong>
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

      <main id="main" className="mx-auto max-w-[1040px] px-4 py-5">
        {children}
      </main>
    </div>
  );
}
