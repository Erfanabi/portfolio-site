import { z } from 'zod';

/* ==========================================================================
   اعتبارسنجی ورودی‌های فرم تماس — کامل در مرورگر انجام می‌شود (بدون بک‌اند)
   ========================================================================== */

/* ارقام فارسی/عربی را به لاتین برمی‌گرداند تا شمارهٔ تلفن یکدست ذخیره شود */
function toLatinDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (d) =>
    String(d.charCodeAt(0) & 0xf)
  );
}

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'نام را کامل بنویسید.').max(80, 'نام بیش از حد بلند است.'),
  email: z.string().trim().email('ایمیل معتبر نیست.').max(120),
  phone: z
    .string()
    .trim()
    .max(25, 'شمارهٔ تلفن بیش از حد بلند است.')
    .transform((v) => toLatinDigits(v).replace(/[\s()‌-]/g, ''))
    .refine((v) => v === '' || /^(\+?\d{8,15})$/.test(v), 'شمارهٔ تلفن معتبر نیست.')
    .optional()
    .or(z.literal('')),
  topic: z.string().trim().min(1, 'موضوع پروژه را انتخاب کنید.').max(80),
  message: z
    .string()
    .trim()
    .min(10, 'کمی بیشتر توضیح بدهید (حداقل ۱۰ نویسه).')
    .max(4000, 'پیام بیش از حد بلند است.'),
});

export type ContactInput = z.infer<typeof contactSchema>;
