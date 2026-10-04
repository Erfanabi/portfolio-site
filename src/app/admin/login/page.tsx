import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'ورود به پنل',
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  /* اگر از قبل وارد شده است، مستقیم به پنل برود */
  if (await isAuthenticated()) redirect('/admin');

  const { from } = await searchParams;

  /* فقط مسیرهای داخلی پذیرفته می‌شوند، تا کسی با ?from=https://… کاربر را جای دیگر نبرد */
  const safeFrom = from && from.startsWith('/admin') ? from : '/admin';

  return (
    <main
      id="main"
      className="flex min-h-dvh items-center justify-center px-4 py-16"
    >
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span
            aria-hidden
            className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand text-xl font-extrabold text-white"
          >
            ع
          </span>
          <h1 className="mt-4 text-xl font-extrabold text-ink">ورود به پنل مدیریت</h1>
          <p className="mt-2 text-[0.82rem] text-muted">
            برای دیدن پیام‌های فرم تماس وارد شوید.
          </p>
        </div>

        <LoginForm redirectTo={safeFrom} />
      </div>
    </main>
  );
}
