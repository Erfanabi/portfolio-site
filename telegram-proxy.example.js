/**
 * واسط امن فرم تماس → تلگرام  (Cloudflare Worker)
 *
 * چرا لازم است؟
 *   توکن ربات اینجا روی سرور می‌ماند و داخل سایت دیده نمی‌شود،
 *   و چون درخواست از سرور کلادفلر به تلگرام می‌رود، فیلترینگ ایران
 *   مشکلی برای بازدیدکننده‌های داخل کشور ایجاد نمی‌کند.
 *
 * راه‌اندازی (رایگان، حدود ۳ دقیقه):
 *   ۱) وارد dash.cloudflare.com شو → Workers & Pages → Create → Worker
 *   ۲) محتوای همین فایل را داخل ویرایشگر کپی کن و Deploy بزن
 *   ۳) در تب Settings → Variables and Secrets دو مقدار را به صورت Secret اضافه کن:
 *        BOT_TOKEN = توکنی که از @BotFather گرفتی
 *        CHAT_ID   = آیدی عددی چت خودت
 *   ۴) در Settings → Variables یک متغیر معمولی هم اضافه کن:
 *        ALLOWED_ORIGIN = آدرس سایتت، مثلاً https://erfansharafi.ir
 *   ۵) آدرس ورکر (چیزی شبیه https://xxx.workers.dev) را در script.js
 *      داخل TELEGRAM.proxyUrl بگذار و botToken و chatId را خالی رها کن.
 */

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || '*';

    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: cors });
    }

    // فقط درخواست‌هایی که از سایت خودت می‌آیند پذیرفته می‌شوند
    if (origin !== '*' && request.headers.get('Origin') !== origin) {
      return new Response('Forbidden', { status: 403, headers: cors });
    }

    let text;
    try {
      ({ text } = await request.json());
    } catch {
      return new Response('Bad Request', { status: 400, headers: cors });
    }

    if (typeof text !== 'string' || !text.trim()) {
      return new Response('Empty message', { status: 400, headers: cors });
    }

    // سقف طول پیام، تا کسی از فرم برای اسپم استفاده نکند
    text = text.slice(0, 3500);

    const res = await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: env.CHAT_ID,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error('telegram error', res.status, detail);
      return new Response('Upstream error', { status: 502, headers: cors });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  },
};
