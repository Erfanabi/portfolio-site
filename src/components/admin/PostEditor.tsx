'use client';

import { useEffect, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Field, Switch, TextArea, TextInput } from '@/components/admin/fields';
import { Markdown } from '@/components/Markdown';
import { postSchema } from '@/lib/validation';
import { faNum, readingMinutes, slugify, stripMarkdown } from '@/lib/utils';

type PostFormData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;
  published: boolean;
  featured: boolean;
};

const empty: PostFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  tags: '',
  published: false,
  featured: false,
};

export function PostEditor({ initial }: { initial?: PostFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [form, setForm] = useState<PostFormData>(initial ?? empty);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState<'save' | 'delete' | null>(null);
  const [preview, setPreview] = useState(false);
  /* تا کاربر دستی نشانی را عوض نکرده باشد، از عنوان ساخته می‌شود */
  const [slugLocked, setSlugLocked] = useState(isEdit);
  const [dirty, setDirty] = useState(false);

  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const set = <K extends keyof PostFormData>(key: K, value: PostFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
  };

  /* هشدار پیش از بستن صفحه با تغییرات ذخیره‌نشده */
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  const minutes = readingMinutes(stripMarkdown(form.content || ''));

  async function save() {
    setError('');

    const parsed = postSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'ورودی نامعتبر است.');
      return;
    }

    setBusy('save');

    try {
      const res = await fetch(isEdit ? `/api/admin/posts/${initial!.id}` : '/api/admin/posts', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const body = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(body.error ?? 'ذخیره ممکن نشد.');
        return;
      }

      setDirty(false);
      router.push('/admin/posts');
      router.refresh();
    } catch {
      setError('اتصال به سرور برقرار نشد.');
    } finally {
      setBusy(null);
    }
  }

  async function remove() {
    if (!initial?.id) return;
    if (!confirm(`«${form.title}» برای همیشه حذف شود؟ این کار برگشت‌پذیر نیست.`)) return;

    setBusy('delete');

    try {
      const res = await fetch(`/api/admin/posts/${initial.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? 'حذف ممکن نشد.');
        return;
      }
      setDirty(false);
      router.push('/admin/posts');
      router.refresh();
    } catch {
      setError('اتصال به سرور برقرار نشد.');
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-ink">
            {isEdit ? 'ویرایش مقاله' : 'مقالهٔ تازه'}
          </h1>
          <p className="mt-1 text-[0.78rem] text-muted">
            {dirty ? 'تغییرات ذخیره نشده است' : 'همهٔ تغییرات ذخیره شده'}
          </p>
        </div>
        <Link
          href="/admin/posts"
          className="text-[0.8rem] font-semibold text-ink-2 hover:text-brand"
        >
          بازگشت به فهرست
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        {/* ستون اصلی */}
        <div className="glass flex flex-col gap-4 rounded-[var(--radius-md)] p-5">
          <Field label="عنوان" htmlFor={id('title')} required>
            <TextInput
              id={id('title')}
              value={form.title}
              maxLength={160}
              onChange={(e) => {
                const title = e.target.value;
                setForm((f) => ({
                  ...f,
                  title,
                  slug: slugLocked ? f.slug : slugify(title),
                }));
                setDirty(true);
              }}
              placeholder="مثلاً چطور یک CRM سبک برای تیم کوچک بسازیم"
            />
          </Field>

          <Field
            label="نشانی صفحه (slug)"
            htmlFor={id('slug')}
            required
            hint={`نشانی نهایی: /blog/${form.slug || '…'}`}
          >
            <TextInput
              id={id('slug')}
              value={form.slug}
              dir="ltr"
              maxLength={90}
              onChange={(e) => {
                setSlugLocked(true);
                set('slug', slugify(e.target.value));
              }}
            />
          </Field>

          <Field
            label="چکیده"
            htmlFor={id('excerpt')}
            required
            hint={`${faNum(form.excerpt.length)} از ۴۰۰ نویسه — در کارت مقاله و نتایج گوگل دیده می‌شود.`}
          >
            <TextArea
              id={id('excerpt')}
              value={form.excerpt}
              rows={3}
              maxLength={400}
              onChange={(e) => set('excerpt', e.target.value)}
            />
          </Field>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor={id('content')} className="text-[0.78rem] font-semibold text-ink-2">
                متن مقاله <span className="text-danger">*</span>
              </label>
              <button
                type="button"
                onClick={() => setPreview((v) => !v)}
                className="rounded-full bg-brand-soft px-3 py-1 text-[0.72rem] font-semibold text-brand"
              >
                {preview ? 'ویرایش' : 'پیش‌نمایش'}
              </button>
            </div>

            {preview ? (
              <div className="glass-soft min-h-[400px] rounded-[var(--radius-sm)] p-4">
                {form.content ? (
                  <Markdown>{form.content}</Markdown>
                ) : (
                  <p className="text-[0.82rem] text-muted">چیزی برای پیش‌نمایش نیست.</p>
                )}
              </div>
            ) : (
              <TextArea
                id={id('content')}
                value={form.content}
                rows={20}
                onChange={(e) => set('content', e.target.value)}
                placeholder={'با مارک‌داون بنویسید…\n\n## یک تیتر\n\nمتن پاراگراف، **پررنگ** و [لینک](https://example.com).'}
              />
            )}

            <p className="num text-[0.7rem] text-muted">
              زمان مطالعهٔ تخمینی: {faNum(minutes)} دقیقه
            </p>
          </div>
        </div>

        {/* ستون کنار */}
        <div className="flex flex-col gap-4">
          <div className="glass flex flex-col gap-3 rounded-[var(--radius-md)] p-5">
            <Switch
              id={id('published')}
              label="منتشر شود"
              hint="تا این کلید خاموش باشد، مقاله فقط برای شما دیده می‌شود."
              checked={form.published}
              onChange={(v) => set('published', v)}
            />
            <Switch
              id={id('featured')}
              label="مقالهٔ شاخص"
              hint="در صفحهٔ اصلی بالاتر از بقیه نشان داده می‌شود."
              checked={form.featured}
              onChange={(v) => set('featured', v)}
            />
          </div>

          <div className="glass flex flex-col gap-4 rounded-[var(--radius-md)] p-5">
            <Field
              label="برچسب‌ها"
              htmlFor={id('tags')}
              hint="با ویرگول جدا کنید. مثلاً: Next.js, معماری, SEO"
            >
              <TextInput
                id={id('tags')}
                value={form.tags}
                maxLength={200}
                onChange={(e) => set('tags', e.target.value)}
                placeholder="Next.js, React"
              />
            </Field>

            <Field
              label="نشانی تصویر کاور"
              htmlFor={id('cover')}
              hint="مسیر داخلی مثل /assets/cover.jpg — اختیاری است."
            >
              <TextInput
                id={id('cover')}
                value={form.coverImage}
                dir="ltr"
                maxLength={500}
                onChange={(e) => set('coverImage', e.target.value)}
                placeholder="/assets/cover.jpg"
              />
            </Field>
          </div>

          <div className="glass flex flex-col gap-3 rounded-[var(--radius-md)] p-5">
            <Button type="button" onClick={save} size="lg" disabled={busy !== null}>
              {busy === 'save' ? 'در حال ذخیره…' : isEdit ? 'ذخیرهٔ تغییرات' : 'ساختن مقاله'}
            </Button>

            {isEdit && (
              <Button type="button" onClick={remove} variant="danger" disabled={busy !== null}>
                {busy === 'delete' ? 'در حال حذف…' : 'حذف مقاله'}
              </Button>
            )}

            {error && (
              <p role="alert" className="text-[0.78rem] leading-6 text-danger">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
