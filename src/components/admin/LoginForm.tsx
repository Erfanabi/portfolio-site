'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const id = useId();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const body = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(body.error ?? 'ورود ممکن نشد.');
        setPassword('');
        return;
      }

      /* refresh تا میدل‌ور کوکی تازه را ببیند */
      router.replace(redirectTo);
      router.refresh();
    } catch {
      setError('اتصال به سرور برقرار نشد.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass flex flex-col gap-4 rounded-[var(--radius-md)] p-6">
      <div>
        <label htmlFor={id} className="mb-1.5 block text-[0.78rem] font-semibold text-ink-2">
          رمز ورود
        </label>
        <input
          id={id}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          autoComplete="current-password"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full rounded-[var(--radius-sm)] border border-line-2 bg-field px-3.5 py-3 text-sm text-ink transition-colors focus:border-brand"
        />
      </div>

      <Button type="submit" size="lg" disabled={busy || !password}>
        {busy ? 'در حال بررسی…' : 'ورود'}
      </Button>

      <p
        id={`${id}-error`}
        role="alert"
        className="min-h-5 text-center text-[0.8rem] text-danger"
      >
        {error}
      </p>
    </form>
  );
}
