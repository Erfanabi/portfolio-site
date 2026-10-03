import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/constants';

/* ==========================================================================
   احراز هویت سادهٔ پنل ادمین
   --------------------------------------------------------------------------
   یک کاربر (صاحب سایت) داریم، پس به جدول کاربر نیازی نیست.
   رمز در ADMIN_PASSWORD است و پس از ورود، یک کوکی امضاشده با HMAC
   صادر می‌شود. کوکی httpOnly است و امضا جلوی دست‌کاری را می‌گیرد.
   ========================================================================== */

export { SESSION_COOKIE };

const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // ۱۲ ساعت

function secret(): string {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 16) {
    throw new Error('AUTH_SECRET تنظیم نشده است یا بیش از حد کوتاه است.');
  }
  return value;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

/** مقایسهٔ امن در برابر حملهٔ زمان‌سنجی */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

/** ساخت توکن نشست: <expiry>.<nonce>.<signature> */
export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const nonce = randomBytes(12).toString('base64url');
  const payload = `${expiresAt}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [expiresAt, nonce, signature] = parts;
  if (!safeEqual(signature, sign(`${expiresAt}.${nonce}`))) return false;

  const expiry = Number(expiresAt);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_TTL_MS / 1000,
};

/** بررسی نشست در Server Component یا Route Handler */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}
