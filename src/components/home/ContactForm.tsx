'use client';

import { useId, useRef, useState } from 'react';
import { contactTopics } from '@/lib/site';
import { contactSchema } from '@/lib/validation';
import { Button } from '@/components/ui';
import { cx } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full rounded-[var(--radius-sm)] border border-line-2 bg-field px-3.5 py-3 text-sm text-ink placeholder:text-muted/80 transition-colors focus:border-brand';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');
  const uid = useId();

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    topic: `${uid}-topic`,
    message: `${uid}-message`,
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    /* همان اعتبارسنجیِ سرور، این‌بار پیش از ارسال */
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setStatus('error');
      setNote(parsed.error.issues[0]?.message ?? 'ورودی نامعتبر است.');
      return;
    }

    setStatus('sending');
    setNote('در حال ارسال…');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const body = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus('error');
        setNote(body.error ?? 'ارسال پیام ممکن نشد. از راه ایمیل در تماس باشید.');
        return;
      }

      form.reset();
      setStatus('sent');
      setNote('پیام شما رسید. معمولاً کمتر از ۲۴ ساعت پاسخ می‌دهم.');
    } catch {
      setStatus('error');
      setNote('اتصال به سرور برقرار نشد. اینترنت را بررسی کنید یا ایمیل بزنید.');
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="glass-soft flex flex-col gap-3.5 rounded-[var(--radius-md)] p-5 sm:p-6"
    >
      <h3 className="text-[1rem] font-bold text-ink">فرم تماس سریع</h3>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className="mb-1.5 block text-[0.78rem] font-semibold text-ink-2">
            نام شما
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={80}
            placeholder="مثلاً مریم رضایی"
            className={field}
          />
        </div>
        <div>
          <label
            htmlFor={ids.email}
            className="mb-1.5 block text-[0.78rem] font-semibold text-ink-2"
          >
            ایمیل شما
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={120}
            dir="ltr"
            placeholder="you@example.com"
            className={cx(field, 'text-start')}
          />
        </div>
      </div>

      <div>
        <label htmlFor={ids.topic} className="mb-1.5 block text-[0.78rem] font-semibold text-ink-2">
          موضوع پروژه
        </label>
        <select id={ids.topic} name="topic" required defaultValue="" className={field}>
          <option value="" disabled>
            یکی را انتخاب کنید…
          </option>
          {contactTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor={ids.message}
          className="mb-1.5 block text-[0.78rem] font-semibold text-ink-2"
        >
          توضیح پروژه
        </label>
        <textarea
          id={ids.message}
          name="message"
          rows={5}
          required
          maxLength={4000}
          placeholder="کمی از پروژه‌تان بگویید…"
          className={cx(field, 'resize-y')}
        />
      </div>

      {/* تلهٔ ربات‌های اسپم — از دید کاربر و صفحه‌خوان پنهان است */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] size-0 opacity-0"
      />

      <Button type="submit" size="lg" disabled={status === 'sending'} className="mt-1 w-full">
        {status === 'sending' ? (
          <>
            <span
              aria-hidden
              className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
            در حال ارسال…
          </>
        ) : (
          <>
            ارسال پیام <span aria-hidden className="rtl:-scale-x-100">➤</span>
          </>
        )}
      </Button>

      {/* aria-live تا صفحه‌خوان نتیجه را اعلام کند */}
      <p
        role="status"
        aria-live="polite"
        className={cx(
          'min-h-5 text-[0.8rem] leading-6',
          status === 'error' && 'text-danger',
          status === 'sent' && 'text-success',
          (status === 'idle' || status === 'sending') && 'text-muted'
        )}
      >
        {note}
      </p>
    </form>
  );
}
