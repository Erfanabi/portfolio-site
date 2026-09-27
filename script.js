const root = document.documentElement;

/* ---------- دارک مود ---------- */
const themeBtn = document.getElementById('themeBtn');
const meta = document.querySelector('meta[name="theme-color"]');

const paintMeta = () =>
  meta && meta.setAttribute(
    'content',
    getComputedStyle(root).getPropertyValue('--bg-1').trim() || '#efeef5'
  );

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
  paintMeta();
});

/* اگر کاربر خودش تم را انتخاب نکرده باشد، تم سیستم را دنبال می‌کند */
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (err) {}
  if (!saved) { root.setAttribute('data-theme', e.matches ? 'dark' : 'light'); paintMeta(); }
});
paintMeta();

/* ---------- کلید زبان ---------- */
const langBtn = document.getElementById('langBtn');
langBtn.addEventListener('click', () => setLang(LANG === 'fa' ? 'en' : 'fa'));

/* ---------- نوار پیشرفت اسکرول ---------- */
const bar = document.getElementById('scrollProgress');
let barFrame = null;

const drawBar = () => {
  barFrame = null;
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max > 0 ? Math.min(scrollY / max, 1) : 0;
  bar.style.transform = `scaleX(${pct})`;
};

addEventListener('scroll', () => {
  if (!barFrame) barFrame = requestAnimationFrame(drawBar);
}, { passive: true });
addEventListener('resize', drawBar);
drawBar();

/* ---------- منوی موبایل ---------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') navLinks.classList.remove('open');
});

/* ---------- لینک فعال هنگام اسکرول ---------- */
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...navLinks.querySelectorAll('a')];

const spy = () => {
  const y = window.scrollY + 140;
  let current = sections[0].id;
  for (const s of sections) if (s.offsetTop <= y) current = s.id;
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
};
window.addEventListener('scroll', spy, { passive: true });
spy();

/* ---------- ظاهرشدن تدریجی ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- نوار متحرک لوگوها ---------- */
document.querySelectorAll('.marquee').forEach(box => {
  const track = box.querySelector('.marquee-track');
  /* نسخهٔ دوم برای حلقهٔ بی‌وقفه */
  track.append(...[...track.children].map(n => {
    const c = n.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    return c;
  }));
  track.style.animationDuration = (box.dataset.speed || 45) + 's';
});

/* ---------- پارالاکس ملایم آیکون‌ها روی عکس ---------- */
const heroVisual = document.querySelector('.hero-visual');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

if (heroVisual && !reduceMotion.matches && matchMedia('(hover: hover)').matches) {
  let frame = null;

  const move = e => {
    if (frame) return;                       /* حداکثر یک‌بار در هر فریم */
    frame = requestAnimationFrame(() => {
      frame = null;
      const r = heroVisual.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / r.width;
      const dy = (e.clientY - r.top - r.height / 2) / r.height;
      heroVisual.style.setProperty('--px', (dx * 18).toFixed(1) + 'px');
      heroVisual.style.setProperty('--py', (dy * 18).toFixed(1) + 'px');
    });
  };

  const reset = () => {
    heroVisual.style.setProperty('--px', '0px');
    heroVisual.style.setProperty('--py', '0px');
  };

  heroVisual.addEventListener('pointermove', move);
  heroVisual.addEventListener('pointerleave', reset);
}

/* ---------- شمارندهٔ دستاوردها ---------- */
const runCount = el => {
  const to = Number(el.dataset.to) || 0;
  const dur = 1400;
  const t0 = performance.now();

  const tick = now => {
    const p = Math.min((now - t0) / dur, 1);
    /* نرم‌شدن حرکت در انتها */
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = num(Math.round(to * eased));
    if (p < 1) requestAnimationFrame(tick);
    else el.dataset.done = '1';
  };
  requestAnimationFrame(tick);
};

const counters = document.querySelectorAll('.count');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  counters.forEach(el => { el.textContent = num(el.dataset.to); el.dataset.done = '1'; });
} else {
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { runCount(en.target); countIO.unobserve(en.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countIO.observe(el));
}

/* ==========================================================================
   فرم تماس → اعلان در تلگرام
   ==========================================================================
   دو حالت دارد؛ فقط یکی را پر کن:

   الف) حالت امن (پیشنهادی) — proxyUrl را پر کن
        آدرس یک سرویس کوچک واسط (مثلاً Cloudflare Worker) که توکن داخل آن
        مخفی می‌ماند. نمونهٔ آمادهٔ آن در فایل telegram-proxy.example.js است.
        مزیت: توکن لو نمی‌رود + برای کاربران داخل ایران هم کار می‌کند.

   ب) حالت مستقیم — botToken و chatId را پر کن و proxyUrl را خالی بگذار
        ساده‌ترین راه، ولی توکن در همین فایل برای همه قابل دیدن است و
        api.telegram.org در ایران فیلتر است.

   گرفتن botToken: در تلگرام به @BotFather پیام بده → /newbot
   گرفتن chatId : به ربات خودت یک پیام بفرست، بعد این آدرس را باز کن:
                  https://api.telegram.org/bot<TOKEN>/getUpdates
                  و مقدار result[0].message.chat.id را بردار.
   ========================================================================== */
const TELEGRAM = {
  proxyUrl: '',   // مثال: 'https://portfolio-form.your-name.workers.dev'
  botToken: '',   // مثال: '1234567890:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw'
  chatId:   '',   // مثال: '123456789'
};

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const submitBtn = document.getElementById('submitBtn');

const esc = v => String(v == null ? '' : v)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const setNote = (msg, kind) => {
  note.textContent = msg;
  note.className = 'form-note' + (kind ? ' is-' + kind : '');
};

const setLoading = on => {
  submitBtn.disabled = on;
  submitBtn.classList.toggle('is-loading', on);
};

/* ساخت متن پیام تلگرام */
function buildMessage(d) {
  const when = new Date().toLocaleString(LANG === 'fa' ? 'fa-IR' : 'en-GB', {
    dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Tehran'
  });
  return [
    t('msg.tgTitle'),
    '',
    `${t('msg.tgName')} ${esc(d.name)}`,
    `${t('msg.tgEmail')} ${esc(d.email)}`,
    `${t('msg.tgTopic')} ${esc(d.topic)}`,
    '',
    t('msg.tgMsg'),
    esc(d.message),
    '',
    `🕒 ${esc(when)}`,
    `🌐 ${esc(location.href)}`,
  ].join('\n');
}

/* ارسال به تلگرام — از طریق واسط یا مستقیم */
async function sendToTelegram(text) {
  if (TELEGRAM.proxyUrl) {
    const res = await fetch(TELEGRAM.proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error('proxy ' + res.status);
    return;
  }

  if (!TELEGRAM.botToken || !TELEGRAM.chatId) {
    throw new Error('Telegram config is incomplete');
  }

  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM.botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM.chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.description || 'HTTP ' + res.status);
}

/* اگر ارسال ممکن نبود، پیام در برنامهٔ ایمیل کاربر باز می‌شود */
function fallbackToMail(d) {
  const subject = encodeURIComponent(`${t('msg.mailSubject')} — ${d.topic}`);
  const body = encodeURIComponent(
    `نام: ${d.name}\nایمیل: ${d.email}\n\n${d.message}`
  );
  location.href = `mailto:erfansharafi60@gmail.com?subject=${subject}&body=${body}`;
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  const fd = Object.fromEntries(new FormData(form).entries());

  /* تلهٔ اسپم: اگر پر شده باشد، فرستنده یک ربات است */
  if (fd.website) return;

  if (!form.checkValidity()) {
    setNote(t('msg.invalid'), 'error');
    return;
  }

  /* جلوگیری از ارسال پشت‌سرهم */
  const last = Number(localStorage.getItem('lastSent') || 0);
  if (Date.now() - last < 30000) {
    setNote(t('msg.tooSoon'), 'error');
    return;
  }

  setLoading(true);
  setNote(t('msg.sending'));

  try {
    await sendToTelegram(buildMessage(fd));
    try { localStorage.setItem('lastSent', String(Date.now())); } catch (err) {}
    form.reset();
    setNote(t('msg.sent'), 'success');
  } catch (err) {
    console.error('[telegram]', err);
    setNote(t('msg.failed'), 'error');
    fallbackToMail(fd);
  } finally {
    setLoading(false);
  }
});
