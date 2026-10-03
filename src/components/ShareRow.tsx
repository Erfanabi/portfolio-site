'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

/** اشتراک‌گذاری مقاله — روی موبایل از منوی اشتراک سیستم استفاده می‌کند */
export function ShareRow({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${site.url}${path}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* اگر دسترسی به کلیپ‌بورد نبود، لینک‌های زیر کار می‌کنند */
    }
  }

  async function share() {
    if (!navigator.share) return copy();
    try {
      await navigator.share({ title, url });
    } catch {
      /* کاربر منصرف شده است */
    }
  }

  const base = 'rounded-full px-3.5 py-2 text-[0.75rem] font-semibold transition-colors';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[0.78rem] font-semibold text-ink-2">اشتراک‌گذاری:</span>

      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`glass-soft ${base} text-ink-2 hover:text-brand`}
      >
        تلگرام
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`glass-soft ${base} text-ink-2 hover:text-brand`}
      >
        واتساپ
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`glass-soft ${base} text-ink-2 hover:text-brand`}
      >
        لینکدین
      </a>

      <button type="button" onClick={share} className={`glass-soft ${base} text-ink-2 hover:text-brand`}>
        {copied ? 'لینک کپی شد ✓' : 'کپی لینک'}
      </button>
    </div>
  );
}
