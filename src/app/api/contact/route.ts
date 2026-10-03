import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema, firstError } from '@/lib/validation';

/* ==========================================================================
   دریافت پیام فرم تماس
   --------------------------------------------------------------------------
   پیام در دیتابیس ذخیره می‌شود و اگر توکن تلگرام تنظیم شده باشد،
   یک اعلان هم فرستاده می‌شود. ارسال تلگرام از سمت سرور انجام می‌شود،
   پس توکن در مرورگر دیده نمی‌شود و فیلترینگ هم مشکلی ایجاد نمی‌کند.
   ========================================================================== */

const rate = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 4;

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'local';
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rate.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    rate.set(ip, hits);
    return true;
  }
  hits.push(now);
  rate.set(ip, hits);
  return false;
}

async function notifyTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error('[telegram]', res.status, await res.text());
  } catch (err) {
    /* پیام در دیتابیس ذخیره شده است، پس شکست اعلان مهم نیست */
    console.error('[telegram]', err);
  }
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'چند پیام پشت‌سرهم فرستاده شده است. چند دقیقه بعد دوباره تلاش کنید.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'درخواست نامعتبر است.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: firstError(parsed.error) }, { status: 400 });
  }

  const { name, email, topic, message, website } = parsed.data;

  /* تلهٔ ربات پر شده است — پاسخ موفق می‌دهیم تا ربات متوجه نشود */
  if (website) return NextResponse.json({ ok: true });

  try {
    await prisma.message.create({
      data: {
        name,
        email,
        topic,
        body: message,
        ip,
        userAgent: req.headers.get('user-agent')?.slice(0, 300) ?? null,
      },
    });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json(
      { error: 'ذخیرهٔ پیام ممکن نشد. لطفاً از راه ایمیل در تماس باشید.' },
      { status: 500 }
    );
  }

  const when = new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Tehran',
  }).format(new Date());

  await notifyTelegram(
    [
      '📬 پیام تازه از سایت',
      '',
      `نام: ${name}`,
      `ایمیل: ${email}`,
      `موضوع: ${topic}`,
      '',
      'پیام:',
      message,
      '',
      `🕒 ${when}`,
    ].join('\n')
  );

  return NextResponse.json({ ok: true });
}
