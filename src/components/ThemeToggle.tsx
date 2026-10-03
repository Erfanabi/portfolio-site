'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  /* تم واقعی را از DOM می‌خوانیم؛ ThemeScript پیش از این آن را گذاشته است */
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'dark' : 'light');
    setMounted(true);
  }, []);

  /* اگر کاربر خودش تمی انتخاب نکرده باشد، تم سیستم را دنبال می‌کنیم */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('theme');
      } catch {
        /* حالت خصوصی مرورگر */
      }
      if (saved) return;
      const next: Theme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      setTheme(next);
    };

    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* حالت خصوصی مرورگر — تم تا پایان همین نشست می‌ماند */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'رفتن به حالت روشن' : 'رفتن به حالت تاریک'}
      title={theme === 'dark' ? 'حالت روشن' : 'حالت تاریک'}
      className="grid size-9 place-items-center rounded-full border border-line-2 text-ink transition-colors hover:bg-brand-soft"
    >
      {/* تا پایان هیدریشن، آیکون ثابت می‌ماند تا ناسازگاری سرور و کلاینت پیش نیاید */}
      <span aria-hidden className="text-sm">
        {!mounted ? '☾' : theme === 'dark' ? '☀' : '☾'}
      </span>
    </button>
  );
}
