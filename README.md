# وب‌سایت شخصی عرفان شرفی

نسخهٔ دوم سایت، ساخته‌شده با **Next.js 15 (App Router)**، **TypeScript**، **Tailwind CSS v4**
و **Prisma + SQLite**. بک‌اند داخل خود پروژه است؛ به سرویس جانبی نیازی نیست.

## چه چیزهایی دارد

- **صفحهٔ اصلی** — معرفی، خدمات، اتوماسیون کسب‌وکار، مهارت‌ها، سوابق، دستاوردها، تحصیلات و تماس.
- **بلاگ** (`/blog`) — فهرست با جستجو، فیلتر برچسب و صفحه‌بندی؛ صفحهٔ مقاله با مارک‌داون،
  مقاله‌های مرتبط، شمارش بازدید و اشتراک‌گذاری.
- **نمونه‌کارها** (`/projects`) — فهرست با فیلتر دسته؛ صفحهٔ پروژه با مشخصات، تکنولوژی‌ها و شرح کامل.
- **پنل مدیریت** (`/admin`) — ساخت، ویرایش، انتشار و حذف مقاله و نمونه‌کار، به‌علاوهٔ صندوق پیام‌های فرم تماس.
- **فرم تماس** — ذخیره در دیتابیس + اعلان اختیاری تلگرام از سمت سرور.
- SEO: متادیتا، `sitemap.xml`، `robots.txt`، Open Graph و داده‌های ساخت‌یافتهٔ JSON-LD.

## راه‌اندازی

```bash
npm install
cp .env.example .env     # مقدارها را پر کن (پایین توضیح داده شده)
npm run db:push          # ساخت جدول‌ها
npm run db:seed          # دادهٔ نمونه (اختیاری)
npm run dev              # http://localhost:4321
```

## متغیرهای محیطی

| متغیر | توضیح |
| --- | --- |
| `DATABASE_URL` | مسیر دیتابیس SQLite، مثلاً `file:./dev.db` |
| `ADMIN_PASSWORD` | رمز ورود به `/admin` — **حتماً عوضش کن** |
| `AUTH_SECRET` | کلید امضای کوکی نشست؛ رشتهٔ تصادفی حداقل ۳۲ نویسه |
| `NEXT_PUBLIC_SITE_URL` | آدرس عمومی سایت، برای sitemap و متادیتا |
| `TELEGRAM_BOT_TOKEN` | اختیاری — برای اعلان پیام‌های فرم تماس |
| `TELEGRAM_CHAT_ID` | اختیاری — آیدی عددی چت مقصد |

ساخت یک `AUTH_SECRET` مناسب:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## دستورها

| دستور | کار |
| --- | --- |
| `npm run dev` | اجرای محیط توسعه روی پورت ۴۳۲۱ |
| `npm run build` | ساخت نسخهٔ تولید |
| `npm start` | اجرای نسخهٔ ساخته‌شده |
| `npm run typecheck` | بررسی تایپ‌ها بدون خروجی |
| `npm run db:push` | اعمال تغییرات schema روی دیتابیس |
| `npm run db:seed` | افزودن دادهٔ نمونه |
| `npm run db:studio` | باز کردن Prisma Studio |

## ساختار

```
prisma/
  schema.prisma          مدل‌های Post، Project و Message
  seed.ts                دادهٔ نمونه
src/
  app/
    (site)/              صفحه‌های عمومی — سربرگ و پانوشت مشترک
      page.tsx           صفحهٔ اصلی
      blog/              فهرست و صفحهٔ مقاله
      projects/          فهرست و صفحهٔ پروژه
    admin/               پنل مدیریت (پشت لایهٔ ورود)
    api/                 بک‌اند — مسیرهای عمومی و ادمین
    layout.tsx           چیدمان ریشه، فونت، متادیتا و تم
    globals.css          توکن‌های تم و استایل‌های مشترک
  components/            اجزای رابط کاربری
  lib/
    site.ts              متن‌های ثابت صفحهٔ اصلی — برای ویرایش محتوا اینجا را عوض کن
    prisma.ts            اتصال دیتابیس
    auth.ts              نشست ادمین
    queries.ts           خواندن داده‌ها
    validation.ts        شکل‌های zod، مشترک بین کلاینت و سرور
  middleware.ts          هدایت زودهنگام مسیرهای /admin
```

## API

مسیرهای عمومی:

| متد | مسیر | کار |
| --- | --- | --- |
| `GET` | `/api/posts?page=&tag=&q=` | فهرست مقاله‌های منتشرشده |
| `GET` | `/api/projects?category=` | فهرست نمونه‌کارهای منتشرشده |
| `POST` | `/api/contact` | ثبت پیام فرم تماس |

مسیرهای ادمین (نیازمند کوکی نشست): `/api/admin/posts`، `/api/admin/projects`
و `/api/admin/messages/[id]` با متدهای `GET`، `POST`، `PATCH` و `DELETE`.

## نکتهٔ امنیتی برای استقرار

- `ADMIN_PASSWORD` و `AUTH_SECRET` را حتماً عوض کن و در مخزن نگذار (`.env` در `.gitignore` است).
- کوکی نشست در حالت تولید `secure` می‌شود، پس سایت باید روی HTTPS باشد.
- SQLite برای این حجم کافی است. اگر روی سکویی مستقر می‌کنی که فایل‌سیستمش ماندگار نیست
  (مثل Vercel)، `datasource` را در `prisma/schema.prisma` به PostgreSQL عوض کن.
