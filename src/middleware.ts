import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/constants';

/* ==========================================================================
   محافظت از مسیرهای /admin
   --------------------------------------------------------------------------
   میدل‌ور فقط وجود کوکی را بررسی می‌کند؛ در Edge به node:crypto دسترسی
   نداریم، پس بررسی کاملِ امضا در خود صفحهٔ ادمین و در مسیرهای API انجام
   می‌شود. این لایه تنها یک هدایت زودهنگام است تا کاربر صفحهٔ خالی نبیند.
   ========================================================================== */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  /* صفحهٔ ورود خودش نباید محافظت شود، وگرنه حلقهٔ هدایت می‌سازد */
  if (pathname === '/admin/login') return NextResponse.next();

  if (!req.cookies.get(SESSION_COOKIE)?.value) {
    const login = new URL('/admin/login', req.url);
    login.searchParams.set('from', pathname + search);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
