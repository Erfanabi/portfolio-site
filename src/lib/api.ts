import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

/** نگهبان مسیرهای ادمین — اگر نشست معتبر نبود، ۴۰۱ برمی‌گرداند */
export async function requireAuth(): Promise<NextResponse | null> {
  if (await isAuthenticated()) return null;
  return NextResponse.json({ error: 'دسترسی ندارید. دوباره وارد شوید.' }, { status: 401 });
}

export async function readJson<T = unknown>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}

/** خطای یکتابودن نشانی را به پیام خوانا تبدیل می‌کند */
export function dbError(err: unknown): NextResponse {
  const code = (err as { code?: string })?.code;
  if (code === 'P2002') {
    return NextResponse.json(
      { error: 'این نشانی قبلاً استفاده شده است. نشانی دیگری بگذارید.' },
      { status: 409 }
    );
  }
  if (code === 'P2025') {
    return NextResponse.json({ error: 'موردی با این شناسه پیدا نشد.' }, { status: 404 });
  }
  console.error('[db]', err);
  return NextResponse.json({ error: 'خطای سرور. دوباره تلاش کنید.' }, { status: 500 });
}
