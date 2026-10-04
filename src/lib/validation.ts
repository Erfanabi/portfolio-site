import { z } from 'zod';

/* ==========================================================================
   اعتبارسنجی ورودی‌ها — همان شکل‌ها در سرور و کلاینت استفاده می‌شوند
   ========================================================================== */

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'نام را کامل بنویسید.').max(80, 'نام بیش از حد بلند است.'),
  email: z.string().trim().email('ایمیل معتبر نیست.').max(120),
  topic: z.string().trim().min(1, 'موضوع پروژه را انتخاب کنید.').max(80),
  message: z
    .string()
    .trim()
    .min(10, 'کمی بیشتر توضیح بدهید (حداقل ۱۰ نویسه).')
    .max(4000, 'پیام بیش از حد بلند است.'),
  // تلهٔ ربات: کاربر واقعی این فیلد را نمی‌بیند، پس باید خالی باشد
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;

const slugField = z
  .string()
  .trim()
  .min(1, 'نشانی الزامی است.')
  .max(90)
  .regex(/^[\p{L}\p{N}-]+$/u, 'نشانی فقط می‌تواند حرف، رقم و خط تیره داشته باشد.');

export const projectSchema = z.object({
  title: z.string().trim().min(3, 'عنوان الزامی است.').max(160),
  slug: slugField,
  summary: z.string().trim().min(10, 'توضیح کوتاه الزامی است.').max(400),
  content: z.string().trim().min(10, 'شرح پروژه الزامی است.'),
  coverImage: z.string().trim().max(500).optional().or(z.literal('')),
  client: z.string().trim().max(120).optional().or(z.literal('')),
  role: z.string().trim().max(120).optional().or(z.literal('')),
  year: z.string().trim().max(40).optional().or(z.literal('')),
  liveUrl: z.string().trim().url('نشانی معتبر نیست.').max(400).optional().or(z.literal('')),
  repoUrl: z.string().trim().url('نشانی معتبر نیست.').max(400).optional().or(z.literal('')),
  category: z.string().trim().min(1).max(40),
  stack: z.string().trim().max(300).optional().or(z.literal('')),
  published: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  order: z.coerce.number().int().min(0).max(9999).optional().default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const loginSchema = z.object({
  password: z.string().min(1, 'رمز را وارد کنید.').max(200),
});

/** پیام خطای خوانا از خروجی zod */
export function firstError(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'ورودی نامعتبر است.';
}
