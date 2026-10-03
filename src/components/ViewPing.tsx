'use client';

import { useEffect } from 'react';

/** یک‌بار در هر نشست مرورگر، بازدید مقاله را ثبت می‌کند */
export function ViewPing({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      /* حالت خصوصی — در این صورت فقط ممکن است دوباره شمرده شود */
    }

    fetch(`/api/posts/${encodeURIComponent(slug)}/view`, {
      method: 'POST',
      keepalive: true,
    }).catch(() => {
      /* بی‌اهمیت */
    });
  }, [slug]);

  return null;
}
