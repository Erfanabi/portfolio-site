'use client';

import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

/* ==========================================================================
   فیلدهای فرم پنل — همه با برچسب، راهنما و پیام خطای درست
   ========================================================================== */

const control =
  'w-full rounded-[var(--radius-sm)] border border-line-2 bg-field px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-brand';

export function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[0.78rem] font-semibold text-ink-2">
        {label}
        {required && (
          <span className="text-danger" aria-label="الزامی">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {hint && <p className="text-[0.7rem] leading-5 text-muted">{hint}</p>}
    </div>
  );
}

export function TextInput({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(control, className)} {...rest} />;
}

export function TextArea({
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx(control, 'resize-y leading-7', className)} {...rest} />;
}

export function Select({
  className,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cx(control, className)} {...rest} />;
}

export function Switch({
  id,
  label,
  hint,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="glass-soft flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] p-3.5"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 accent-[var(--violet)]"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-[0.82rem] font-semibold text-ink">{label}</span>
        {hint && <span className="text-[0.7rem] leading-5 text-muted">{hint}</span>}
      </span>
    </label>
  );
}
