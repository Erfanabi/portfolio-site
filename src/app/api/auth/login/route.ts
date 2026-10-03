import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
} from '@/lib/auth';
import { loginSchema } from '@/lib/validation';

/* محدودکردن تلاش‌های ناموفق ورود، بر پایهٔ حافظه */
const attempts = new Map<string, { count: number; until: number }>();
const MAX_ATTEMPTS = 6;
const LOCK_MS = 10 * 60 * 1000;

function clientKey(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() || 'local';
}

export async function POST(req: Request) {
  const key = clientKey(req);
  const record = attempts.get(key);

  if (record && record.count >= MAX_ATTEMPTS && Date.now() < record.until) {
    const minutes = Math.ceil((record.until - Date.now()) / 60000);
    return NextResponse.json(
      { error: `تلاش‌های ناموفق زیاد بوده است. ${minutes} دقیقه دیگر دوباره امتحان کنید.` },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'درخواست نامعتبر است.' }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'رمز را وارد کنید.' }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD روی سرور تنظیم نشده است.' },
      { status: 500 }
    );
  }

  if (!verifyPassword(parsed.data.password)) {
    const next = record && Date.now() < record.until ? record.count + 1 : 1;
    attempts.set(key, { count: next, until: Date.now() + LOCK_MS });
    return NextResponse.json({ error: 'رمز درست نیست.' }, { status: 401 });
  }

  attempts.delete(key);

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);

  return NextResponse.json({ ok: true });
}
