'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/** کارهای هر پیام: خوانده‌شدن، بایگانی و حذف */
export function MessageActions({
  id,
  read,
  archived,
  name,
  replyTo,
  topic,
}: {
  id: string;
  read: boolean;
  archived: boolean;
  name: string;
  replyTo: string;
  topic: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  async function patch(data: Record<string, boolean>, label: string) {
    setBusy(label);
    setError('');

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        setError('انجام نشد.');
        return;
      }
      router.refresh();
    } catch {
      setError('اتصال برقرار نشد.');
    } finally {
      setBusy('');
    }
  }

  async function remove() {
    if (!confirm(`پیام «${name}» برای همیشه حذف شود؟`)) return;

    setBusy('delete');
    setError('');

    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        setError('حذف نشد.');
        return;
      }
      router.refresh();
    } catch {
      setError('اتصال برقرار نشد.');
    } finally {
      setBusy('');
    }
  }

  const btn =
    'rounded-full px-3 py-1.5 text-[0.72rem] font-semibold transition-colors disabled:opacity-60';

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex flex-wrap items-center justify-end gap-1.5">
        <a
          href={`mailto:${replyTo}?subject=${encodeURIComponent(`پاسخ: ${topic}`)}`}
          className={`${btn} bg-brand text-white hover:bg-brand-2`}
        >
          پاسخ با ایمیل
        </a>

        <button
          type="button"
          onClick={() => patch({ read: !read }, 'read')}
          disabled={Boolean(busy)}
          className={`${btn} glass-soft text-ink-2 hover:text-brand`}
        >
          {busy === 'read' ? '…' : read ? 'خوانده‌نشده' : 'خوانده شد'}
        </button>

        <button
          type="button"
          onClick={() => patch({ archived: !archived }, 'archive')}
          disabled={Boolean(busy)}
          className={`${btn} glass-soft text-ink-2 hover:text-brand`}
        >
          {busy === 'archive' ? '…' : archived ? 'بازگردانی' : 'بایگانی'}
        </button>

        <button
          type="button"
          onClick={remove}
          disabled={Boolean(busy)}
          className={`${btn} bg-danger/12 text-danger hover:bg-danger/20`}
        >
          {busy === 'delete' ? '…' : 'حذف'}
        </button>
      </div>

      {error && (
        <span role="alert" className="text-[0.68rem] text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
