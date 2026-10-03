import { cx } from '@/lib/utils';

/* ==========================================================================
   ظاهرشدن تدریجی هنگام اسکرول
   --------------------------------------------------------------------------
   این کامپوننت عمداً سروری است و هیچ جاوااسکریپتی به مرورگر نمی‌فرستد.
   پنهان‌کردن و نمایش را اسکریپت کوچکِ RevealScript انجام می‌دهد که پیش از
   هیدریشن اجرا می‌شود؛ پس محتوا منتظر React نمی‌ماند و اگر جاوااسکریپت
   خاموش باشد، همه چیز از همان اول دیده می‌شود.
   ========================================================================== */
export function Reveal({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
  delay?: number;
}) {
  return (
    <Tag
      className={cx('reveal', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
