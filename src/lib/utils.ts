/* ==========================================================================
   کمک‌کننده‌های عمومی
   ========================================================================== */

/** چسباندن کلاس‌ها با نادیده‌گرفتن مقدارهای خالی */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/** تبدیل ارقام لاتین به فارسی */
export function faNum(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

/** تاریخ شمسی خوانا، مثلاً «۱۲ مهر ۱۴۰۴» */
export function faDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tehran',
  }).format(d);
}

/** تاریخ و ساعت، برای پنل ادمین */
export function faDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Asia/Tehran',
  }).format(d);
}

/**
 * ساخت نشانی یکتا از عنوان.
 * حروف فارسی حفظ می‌شوند تا نشانی خوانا بماند؛ مرورگرها خودشان آن را انکود می‌کنند.
 */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[‌‏‎]/g, '') // نیم‌فاصله و نشانه‌های جهت
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** تخمین زمان مطالعه بر پایهٔ تعداد واژه (فارسی ≈ ۲۰۰ واژه در دقیقه) */
export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** رشتهٔ «a, b, c» را به آرایهٔ تمیز تبدیل می‌کند */
export function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/** کوتاه‌کردن متن با سه‌نقطه */
export function truncate(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

/** حذف نشانه‌های مارک‌داون برای ساخت چکیده یا توضیحات متا */
export function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
