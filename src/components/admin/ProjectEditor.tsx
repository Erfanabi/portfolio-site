'use client';

import { useEffect, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Field, Select, Switch, TextArea, TextInput } from '@/components/admin/fields';
import { Markdown } from '@/components/Markdown';
import { projectSchema } from '@/lib/validation';
import { projectCategories } from '@/lib/site';
import { faNum, slugify } from '@/lib/utils';

type ProjectFormData = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  client: string;
  role: string;
  year: string;
  liveUrl: string;
  repoUrl: string;
  category: string;
  stack: string;
  published: boolean;
  featured: boolean;
  order: number;
};

const empty: ProjectFormData = {
  title: '',
  slug: '',
  summary: '',
  content: '',
  coverImage: '',
  client: '',
  role: '',
  year: '',
  liveUrl: '',
  repoUrl: '',
  category: 'web',
  stack: '',
  published: false,
  featured: false,
  order: 0,
};

export function ProjectEditor({ initial }: { initial?: ProjectFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [form, setForm] = useState<ProjectFormData>(initial ?? empty);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState<'save' | 'delete' | null>(null);
  const [preview, setPreview] = useState(false);
  const [slugLocked, setSlugLocked] = useState(isEdit);
  const [dirty, setDirty] = useState(false);

  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const set = <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
  };

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  async function save() {
    setError('');

    const parsed = projectSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'ورودی نامعتبر است.');
      return;
    }

    setBusy('save');

    try {
      const res = await fetch(
        isEdit ? `/api/admin/projects/${initial!.id}` : '/api/admin/projects',
        {
          method: isEdit ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed.data),
        }
      );

      const body = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(body.error ?? 'ذخیره ممکن نشد.');
        return;
      }

      setDirty(false);
      router.push('/admin/projects');
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
      const res = await fetch(`/api/admin/projects/${initial.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? 'حذف ممکن نشد.');
        return;
      }
      setDirty(false);
      router.push('/admin/projects');
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
            {isEdit ? 'ویرایش نمونه‌کار' : 'نمونه‌کار تازه'}
          </h1>
          <p className="mt-1 text-[0.78rem] text-muted">
            {dirty ? 'تغییرات ذخیره نشده است' : 'همهٔ تغییرات ذخیره شده'}
          </p>
        </div>
        <Link
          href="/admin/projects"
          className="text-[0.8rem] font-semibold text-ink-2 hover:text-brand"
        >
          بازگشت به فهرست
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="glass flex flex-col gap-4 rounded-[var(--radius-md)] p-5">
          <Field label="عنوان پروژه" htmlFor={id('title')} required>
            <TextInput
              id={id('title')}
              value={form.title}
              maxLength={160}
              onChange={(e) => {
                const title = e.target.value;
                setForm((f) => ({ ...f, title, slug: slugLocked ? f.slug : slugify(title) }));
                setDirty(true);
              }}
              placeholder="مثلاً سامانهٔ CRM هلیوم پارک"
            />
          </Field>

          <Field
            label="نشانی صفحه (slug)"
            htmlFor={id('slug')}
            required
            hint={`نشانی نهایی: /projects/${form.slug || '…'}`}
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
            label="توضیح کوتاه"
            htmlFor={id('summary')}
            required
            hint={`${faNum(form.summary.length)} از ۴۰۰ نویسه — در کارت پروژه دیده می‌شود.`}
          >
            <TextArea
              id={id('summary')}
              value={form.summary}
              rows={3}
              maxLength={400}
              onChange={(e) => set('summary', e.target.value)}
            />
          </Field>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor={id('content')} className="text-[0.78rem] font-semibold text-ink-2">
                شرح کامل پروژه <span className="text-danger">*</span>
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
              <div className="glass-soft min-h-[300px] rounded-[var(--radius-sm)] p-4">
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
                rows={16}
                onChange={(e) => set('content', e.target.value)}
                placeholder={'## مسئله\n\nچه چیزی قرار بود حل شود؟\n\n## کاری که کردم\n\n- …\n\n## نتیجه\n\n…'}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="glass flex flex-col gap-3 rounded-[var(--radius-md)] p-5">
            <Switch
              id={id('published')}
              label="منتشر شود"
              hint="تا این کلید خاموش باشد، پروژه در سایت دیده نمی‌شود."
              checked={form.published}
              onChange={(v) => set('published', v)}
            />
            <Switch
              id={id('featured')}
              label="پروژهٔ شاخص"
              hint="در صفحهٔ اصلی و بالای فهرست نشان داده می‌شود."
              checked={form.featured}
              onChange={(v) => set('featured', v)}
            />
          </div>

          <div className="glass flex flex-col gap-4 rounded-[var(--radius-md)] p-5">
            <Field label="دسته" htmlFor={id('category')} required>
              <Select
                id={id('category')}
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {projectCategories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="کارفرما" htmlFor={id('client')}>
              <TextInput
                id={id('client')}
                value={form.client}
                maxLength={120}
                onChange={(e) => set('client', e.target.value)}
                placeholder="هلیوم پارک"
              />
            </Field>

            <Field label="نقش من" htmlFor={id('role')}>
              <TextInput
                id={id('role')}
                value={form.role}
                maxLength={120}
                onChange={(e) => set('role', e.target.value)}
                placeholder="تنها توسعه‌دهندهٔ فرانت‌اند"
              />
            </Field>

            <Field label="سال" htmlFor={id('year')}>
              <TextInput
                id={id('year')}
                value={form.year}
                maxLength={40}
                onChange={(e) => set('year', e.target.value)}
                placeholder="۱۴۰۴"
              />
            </Field>

            <Field
              label="ترتیب نمایش"
              htmlFor={id('order')}
              hint="عدد کوچک‌تر بالاتر نشان داده می‌شود."
            >
              <TextInput
                id={id('order')}
                type="number"
                min={0}
                max={9999}
                value={form.order}
                onChange={(e) => set('order', Number(e.target.value) || 0)}
              />
            </Field>
          </div>

          <div className="glass flex flex-col gap-4 rounded-[var(--radius-md)] p-5">
            <Field
              label="تکنولوژی‌ها"
              htmlFor={id('stack')}
              hint="با ویرگول جدا کنید. مثلاً: Next.js, TypeScript, PostgreSQL"
            >
              <TextInput
                id={id('stack')}
                value={form.stack}
                maxLength={300}
                onChange={(e) => set('stack', e.target.value)}
              />
            </Field>

            <Field label="نشانی سایت پروژه" htmlFor={id('live')} hint="با https:// شروع شود.">
              <TextInput
                id={id('live')}
                value={form.liveUrl}
                dir="ltr"
                maxLength={400}
                onChange={(e) => set('liveUrl', e.target.value)}
                placeholder="https://example.com"
              />
            </Field>

            <Field label="نشانی مخزن کد" htmlFor={id('repo')} hint="با https:// شروع شود.">
              <TextInput
                id={id('repo')}
                value={form.repoUrl}
                dir="ltr"
                maxLength={400}
                onChange={(e) => set('repoUrl', e.target.value)}
                placeholder="https://github.com/…"
              />
            </Field>

            <Field label="نشانی تصویر کاور" htmlFor={id('cover')}>
              <TextInput
                id={id('cover')}
                value={form.coverImage}
                dir="ltr"
                maxLength={500}
                onChange={(e) => set('coverImage', e.target.value)}
                placeholder="/assets/project.jpg"
              />
            </Field>
          </div>

          <div className="glass flex flex-col gap-3 rounded-[var(--radius-md)] p-5">
            <Button type="button" onClick={save} size="lg" disabled={busy !== null}>
              {busy === 'save' ? 'در حال ذخیره…' : isEdit ? 'ذخیرهٔ تغییرات' : 'ساختن نمونه‌کار'}
            </Button>

            {isEdit && (
              <Button type="button" onClick={remove} variant="danger" disabled={busy !== null}>
                {busy === 'delete' ? 'در حال حذف…' : 'حذف نمونه‌کار'}
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
