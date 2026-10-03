'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';

/** جستجوی مقاله‌ها — با ارسال فرم، آدرس صفحه عوض می‌شود */
export function BlogSearch({
  initialQuery,
  tag,
}: {
  initialQuery: string;
  tag?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const id = useId();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    const q = value.trim();
    if (q) params.set('q', q);
    if (tag) params.set('tag', tag);
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : '/blog');
  }

  return (
    <form onSubmit={onSubmit} role="search" className="flex gap-2">
      <label htmlFor={id} className="sr-only">
        جستجو در مقاله‌ها
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="جستجو در مقاله‌ها…"
        className="w-full max-w-sm rounded-full border border-line-2 bg-field px-4 py-2.5 text-sm text-ink placeholder:text-muted/80 transition-colors focus:border-brand"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-brand px-4 py-2.5 text-[0.8rem] font-semibold text-white transition-colors hover:bg-brand-2"
      >
        جستجو
      </button>
    </form>
  );
}
