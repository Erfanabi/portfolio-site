'use client';

import { useId, useState } from 'react';
import { contactTopics, site } from '@/lib/site';
import { contactSchema, type ContactInput } from '@/lib/validation';
import { Button } from '@/components/ui';
import { cx } from '@/lib/utils';

/* ==========================================================================
   فرم تماس — بدون بک‌اند
   --------------------------------------------------------------------------
   هیچ سروری پشت این فرم نیست. فرم فقط ورودی را اعتبارسنجی می‌کند و بعد
   همان متن را در ایمیل، واتس‌اپ یا تلگرام کاربر آماده می‌کند تا پیام
   مستقیم به خودم برسد. اگر هیچ‌کدام باز نشد، دکمهٔ «رونوشت متن پیام»
   همان متن را در کلیپ‌بورد می‌گذارد.

   نکته: تلگرام برخلاف واتس‌اپ اجازهٔ پر کردن متن گفت‌وگوی خصوصی از روی
   لینک را نمی‌دهد، پس متن رونوشت می‌شود و گفت‌وگو باز می‌شود تا کاربر
   فقط جای‌گذاری کند.
   ========================================================================== */

type Status = 'idle' | 'error' | 'ready' | 'copied';

const field =
  'w-full rounded-[var(--radius-sm)] border border-line-2 bg-field px-3.5 py-3 text-sm text-ink placeholder:text-muted/80 transition-colors focus:border-brand';

/* رونوشت متن؛ اگر Clipboard API در دسترس نبود، راه قدیمی امتحان می‌شود */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* مرورگرهای قدیمی‌تر یا زمینهٔ غیرامن — انتخاب دستی متن */
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}

/** متن یکدستِ پیام — هم برای ایمیل و هم برای واتس‌اپ */
function composeMessage(data: ContactInput): { subject: string; body: string } {
  const subject = `درخواست پروژه — ${data.topic} — ${data.name}`;
  const body = [
    `نام: ${data.name}`,
    `ایمیل: ${data.email}`,
    ...(data.phone ? [`تلفن: ${data.phone}`] : []),
    `موضوع: ${data.topic}`,
    '',
    'توضیح پروژه:',
    data.message,
  ].join('\n');

  return { subject, body };
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');
  /* متن آمادهٔ پیام، وقتی رونوشت ممکن نشد و کاربر باید خودش انتخابش کند */
  const [fallbackText, setFallbackText] = useState('');
  const uid = useId();

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    topic: `${uid}-topic`,
    message: `${uid}-message`,
  };

  /** ورودی را می‌خواند و اعتبارسنجی می‌کند؛ در صورت خطا null برمی‌گرداند */
  function validate(form: HTMLFormElement): ContactInput | null {
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      setStatus('error');
      setNote(parsed.error.issues[0]?.message ?? 'ورودی نامعتبر است.');
      return null;
    }

    return parsed.data;
  }

  /* ارسال فرم = باز کردن برنامهٔ ایمیل با متن آمادهٔ پیام */
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = validate(e.currentTarget);
    if (!data) return;

    const { subject, body } = composeMessage(data);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setFallbackText('');
    setStatus('ready');
    setNote(
      'برنامهٔ ایمیل‌تان با متن آمادهٔ پیام باز می‌شود؛ فقط «ارسال» را بزنید. اگر باز نشد، از واتس‌اپ یا رونوشت متن استفاده کنید.'
    );
  }

  /* واتس‌اپ: همان متن، این‌بار در گفت‌وگوی واتس‌اپ من */
  function onWhatsApp(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form) return;

    const data = validate(form);
    if (!data) return;

    const { subject, body } = composeMessage(data);
    window.open(
      `${site.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`,
      '_blank',
      'noopener,noreferrer'
    );

    setFallbackText('');
    setStatus('ready');
    setNote('واتس‌اپ با متن آمادهٔ پیام باز می‌شود؛ فقط «ارسال» را بزنید.');
  }

  /* تلگرام: متن رونوشت می‌شود و گفت‌وگوی من باز می‌شود تا جای‌گذاری شود */
  async function onTelegram(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form) return;

    const data = validate(form);
    if (!data) return;

    const { subject, body } = composeMessage(data);
    const text = `${subject}\n\n${body}`;
    const copied = await copyText(text);

    window.open(`https://t.me/${site.telegram}`, '_blank', 'noopener,noreferrer');

    if (copied) {
      setFallbackText('');
      setStatus('ready');
      setNote('متن پیام رونوشت شد و تلگرام باز می‌شود؛ فقط جای‌گذاری و ارسال کنید.');
    } else {
      setFallbackText(text);
      setStatus('error');
      setNote('تلگرام باز می‌شود. رونوشت خودکار ممکن نشد — متن زیر را انتخاب و در تلگرام بفرستید.');
    }
  }

  /* راه آخر: متن در کلیپ‌بورد تا کاربر هرجا خواست بفرستد */
  async function onCopy(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form) return;

    const data = validate(form);
    if (!data) return;

    const { subject, body } = composeMessage(data);

    const text = `${subject}\n\n${body}`;

    if (await copyText(text)) {
      setFallbackText('');
      setStatus('copied');
      setNote(`متن پیام رونوشت شد. آن را به ${site.email} بفرستید.`);
    } else {
      /* رونوشت خودکار مجاز نبود — متن را نشان می‌دهیم تا دستی انتخاب شود */
      setFallbackText(text);
      setStatus('error');
      setNote(`رونوشت خودکار ممکن نشد. متن زیر را انتخاب و به ${site.email} بفرستید.`);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass-soft flex flex-col gap-3.5 rounded-[var(--radius-md)] p-5 sm:p-6"
    >
      <div>
        <h3 className="text-[1rem] font-bold text-ink">فرم تماس سریع</h3>
        <p className="mt-1.5 text-[0.78rem] leading-6 text-muted">
          فرم را پر کنید؛ پیام با متن آماده در ایمیل، واتس‌اپ یا تلگرام خودتان باز می‌شود و مستقیم
          به من می‌رسد.
        </p>
      </div>

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
        <label htmlFor={ids.phone} className="mb-1.5 block text-[0.78rem] font-semibold text-ink-2">
          شمارهٔ تلفن <span className="font-normal text-muted">(اختیاری)</span>
        </label>
        <input
          id={ids.phone}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={25}
          dir="ltr"
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          className={cx(field, 'text-start')}
        />
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

      <Button type="submit" size="lg" className="mt-1 w-full">
        ارسال با ایمیل <span aria-hidden className="rtl:-scale-x-100">➤</span>
      </Button>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button type="button" variant="light" onClick={onWhatsApp} className="w-full">
          ارسال با واتس‌اپ <span aria-hidden>✆</span>
        </Button>
        {site.telegram && (
          <Button type="button" variant="light" onClick={onTelegram} className="w-full">
            ارسال با تلگرام <span aria-hidden className="rtl:-scale-x-100">➤</span>
          </Button>
        )}
        <Button
          type="button"
          variant="light"
          onClick={onCopy}
          className="w-full sm:col-span-2"
        >
          رونوشت متن پیام <span aria-hidden>⧉</span>
        </Button>
      </div>

      {/* aria-live تا صفحه‌خوان نتیجه را اعلام کند */}
      <p
        role="status"
        aria-live="polite"
        className={cx(
          'min-h-5 text-[0.8rem] leading-6',
          status === 'error' && 'text-danger',
          (status === 'ready' || status === 'copied') && 'text-success',
          status === 'idle' && 'text-muted'
        )}
      >
        {note}
      </p>

      {fallbackText && (
        <textarea
          readOnly
          rows={8}
          value={fallbackText}
          aria-label="متن آمادهٔ پیام برای رونوشت دستی"
          onFocus={(e) => e.currentTarget.select()}
          className={cx(field, 'resize-y font-mono text-[0.75rem] leading-6')}
        />
      )}
    </form>
  );
}
