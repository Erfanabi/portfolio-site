'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cx } from '@/lib/utils';

/** کلید انتشار سریع، بدون باز کردن صفحهٔ ویرایش */
export function PublishToggle({
  kind,
  id,
  published,
  title,
}: {
  kind: 'posts' | 'projects';
  id: string;
  published: boolean;
  title: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function toggle() {
    setBusy(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/${kind}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !published }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? 'تغییر وضعیت ممکن نشد.');
        return;
      }

      router.refresh();
    } catch {
      setError('اتصال به سرور برقرار نشد.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        aria-label={published ? `برگرداندن «${title}» به پیش‌نویس` : `انتشار «${title}»`}
        className={cx(
          'rounded-full px-3.5 py-2 text-[0.75rem] font-semibold transition-colors disabled:opacity-60',
          published
            ? 'bg-warning/15 text-warning hover:bg-warning/25'
            : 'bg-success/15 text-success hover:bg-success/25'
        )}
      >
        {busy ? '…' : published ? 'پیش‌نویس کن' : 'منتشر کن'}
      </button>
      {error && (
        <span role="alert" className="text-[0.68rem] text-danger">
          {error}
        </span>
      )}
    </span>
  );
}
