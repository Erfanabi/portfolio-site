import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cx } from '@/lib/utils';

/* ==========================================================================
   اجزای پایهٔ رابط کاربری
   ========================================================================== */

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-55';

const sizes = {
  sm: 'px-4 py-2 text-[0.8rem]',
  md: 'px-5 py-2.5',
  lg: 'px-6 py-3 text-base',
} as const;

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-2 hover:-translate-y-0.5 shadow-glass-sm',
  dark: 'bg-[var(--btn-solid)] text-[var(--btn-solid-ink)] hover:bg-[var(--btn-solid-hover)] hover:-translate-y-0.5',
  light: 'glass-soft text-ink hover:-translate-y-0.5 hover:border-brand/40',
  ghost: 'text-ink-2 hover:bg-brand-soft hover:text-brand',
  danger: 'bg-danger/12 text-danger hover:bg-danger/20',
} as const;

type ButtonStyle = { variant?: keyof typeof variants; size?: keyof typeof sizes };

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ComponentProps<'button'> & ButtonStyle) {
  return <button className={cx(base, sizes[size], variants[variant], className)} {...rest} />;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ComponentProps<typeof Link> & ButtonStyle) {
  return <Link className={cx(base, sizes[size], variants[variant], className)} {...rest} />;
}

export function ExternalButtonLink({
  variant = 'light',
  size = 'md',
  className,
  ...rest
}: ComponentProps<'a'> & ButtonStyle) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cx(base, sizes[size], variants[variant], className)}
      {...rest}
    />
  );
}

/** فلشی که در RTL به چپ و در LTR به راست می‌رود */
export function Arrow({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cx('inline-block rtl:-scale-x-100', className)}>
      ↗
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cx(
        'text-balance text-2xl font-extrabold leading-[1.35] text-ink sm:text-3xl md:text-[2.1rem]',
        className
      )}
    >
      {children}
    </h2>
  );
}

export function Panel({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cx('glass panel', className)}>
      {children}
    </div>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border border-line-2 bg-brand-soft/60 px-2.5 py-1 text-[0.7rem] font-semibold text-brand',
        className
      )}
    >
      {children}
    </span>
  );
}

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'brand';
}) {
  const tones = {
    neutral: 'bg-ink/8 text-ink-2',
    success: 'bg-success/15 text-success',
    warning: 'bg-warning/15 text-warning',
    brand: 'bg-brand-soft text-brand',
  } as const;

  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold',
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

/** حالت خالی — جای فهرست‌های بدون نتیجه */
export function EmptyState({
  icon = '◌',
  title,
  description,
  action,
}: {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="glass-soft flex flex-col items-center gap-3 rounded-[var(--radius-md)] px-6 py-14 text-center">
      <span aria-hidden className="text-3xl text-brand/70">
        {icon}
      </span>
      <p className="text-base font-bold text-ink">{title}</p>
      {description && <p className="max-w-md text-sm leading-7 text-muted">{description}</p>}
      {action}
    </div>
  );
}
