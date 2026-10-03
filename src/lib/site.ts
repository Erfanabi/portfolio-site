/* ==========================================================================
   محتوای ثابت سایت — بخش‌هایی که در دیتابیس نیستند
   برای ویرایش متن‌های صفحهٔ اصلی، فقط همین فایل را تغییر بده.
   ========================================================================== */

export const site = {
  name: 'عرفان شرفی',
  role: 'مهندس فرانت‌اند و سیستم‌های کسب‌وکار',
  shortRole: 'مهندس فرانت‌اند',
  initials: 'ع‌ش',
  email: 'erfansharafi60@gmail.com',
  phone: '+989105003119',
  phoneLabel: '+98 910 500 3119',
  location: 'مشهد، ایران',
  github: 'https://github.com/Erfanabi',
  linkedin: 'https://linkedin.com/in/erfansharafi',
  resume: '/assets/Erfan_Sharafi_Resume.pdf',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://erfansharafi.ir',
  description:
    'عرفان شرفی — مهندس فرانت‌اند و سازندهٔ سیستم‌های عملیاتی کسب‌وکار. وب‌اپلیکیشن با React و Next.js، و اتوماسیون فرآیندها با n8n.',
} as const;

export const navLinks = [
  { href: '/', label: 'خانه' },
  { href: '/#about', label: 'درباره من' },
  { href: '/#services', label: 'خدمات' },
  { href: '/#automation', label: 'اتوماسیون' },
  { href: '/projects', label: 'نمونه‌کارها' },
  { href: '/blog', label: 'بلاگ' },
  { href: '/#work', label: 'سوابق' },
  { href: '/#contact', label: 'تماس' },
] as const;

export const trustedBy = [
  'گروه یکتا',
  'هلیوم پارک',
  'نگاه ره‌گشا',
  'نماآفرین',
  'دانشگاه خیام',
] as const;

export const services = [
  {
    icon: '◪',
    title: 'سیستم‌های عملیاتی کسب‌وکار',
    desc: 'وب‌سایتی که کار روزمرهٔ کسب‌وکار را انجام می‌دهد، نه فقط معرفی‌اش کند.',
  },
  {
    icon: '⚙',
    title: 'اتوماسیون فرآیندها',
    desc: 'خودکارسازی کارهای تکراری با n8n، وب‌هوک و اتصال سرویس‌ها به هم.',
  },
  {
    icon: '◧',
    title: 'توسعهٔ وب‌اپلیکیشن',
    desc: 'ساخت اپلیکیشن‌های مقیاس‌پذیر با React و Next.js برای وب و موبایل.',
  },
  {
    icon: '◫',
    title: 'معماری فرانت‌اند',
    desc: 'طراحی سیستم‌های فرانت‌اند سرتاسری که با رشد پروژه قابل نگهداری می‌مانند.',
  },
  {
    icon: '◨',
    title: 'یکپارچه‌سازی API',
    desc: 'اتصال REST، GraphQL و WebSocket با Node.js، Express و Fastify.',
  },
  {
    icon: '◩',
    title: 'قابلیت‌های هوش مصنوعی',
    desc: 'تحلیل احساسات، اتصال به LLM API و پردازش داده‌های رفتاری در محیط عملیاتی.',
  },
] as const;

export const automation = {
  before: [
    'سفارش‌ها لای چت تلگرام و واتساپ گم می‌شوند',
    'فاکتور دستی نوشته می‌شود و اشتباه پیش می‌آید',
    'نوبت‌ها روی دفتر کاغذی ثبت می‌شوند',
    'پیگیری مشتری به حافظه و یادداشت وابسته است',
    'گزارش فروش یا وجود ندارد یا دستی ساخته می‌شود',
  ],
  after: [
    'سفارش‌ها در یک پنل ثبت و پیگیری می‌شوند',
    'فاکتور خودکار صادر و برای مشتری ارسال می‌شود',
    'نوبت‌دهی آنلاین با یادآوری خودکار انجام می‌شود',
    'پیگیری مشتری روی زمان‌بندی خودکار می‌افتد',
    'گزارش فروش و عملکرد لحظه‌ای در داشبورد است',
  ],
  cards: [
    { icon: '🧾', title: 'ثبت سفارش', desc: 'فرم سفارش آنلاین، ثبت خودکار در سیستم و اطلاع‌رسانی فوری به تیم.' },
    { icon: '📅', title: 'نوبت‌دهی', desc: 'رزرو آنلاین، مدیریت تقویم و یادآوری خودکار پیش از نوبت.' },
    { icon: '🧮', title: 'صدور فاکتور', desc: 'تولید خودکار فاکتور، ارسال برای مشتری و بایگانی منظم سوابق.' },
    { icon: '👥', title: 'پیگیری مشتری', desc: 'تاریخچهٔ هر مشتری، یادآوری تماس و پیام خودکار در زمان درست.' },
    { icon: '📊', title: 'گزارش‌گیری', desc: 'داشبورد فروش و عملکرد، به‌علاوهٔ گزارش دوره‌ای که خودش ساخته می‌شود.' },
    { icon: '🔗', title: 'اتصال سرویس‌ها', desc: 'وصل‌کردن ابزارهایی که همین حالا دارید به هم، با n8n و وب‌هوک.' },
  ],
  steps: [
    {
      n: '۱',
      title: 'مشاوره و شناخت',
      desc: 'می‌بینم کار در کسب‌وکار شما واقعاً چطور انجام می‌شود، نه اینکه چطور باید بشود.',
    },
    {
      n: '۲',
      title: 'شناسایی نیاز',
      desc: 'مشخص می‌کنم کدام کارها ارزش خودکارشدن دارند و کدام‌ها بهتر است دستی بمانند.',
    },
    {
      n: '۳',
      title: 'پیاده‌سازی و تحویل',
      desc: 'سیستم را می‌سازم، راه می‌اندازم و به تیم شما آموزش می‌دهم.',
    },
  ],
} as const;

export const techRows = [
  {
    speed: 46,
    dir: 'normal' as const,
    items: [
      ['React', 'react', '61DAFB'],
      ['Next.js', 'nextdotjs', '8E8EA0'],
      ['TypeScript', 'typescript', '3178C6'],
      ['JavaScript', 'javascript', 'F7DF1E'],
      ['Tailwind CSS', 'tailwindcss', '06B6D4'],
      ['Redux Toolkit', 'redux', '764ABC'],
      ['React Query', 'reactquery', 'FF4154'],
      ['Bootstrap', 'bootstrap', '7952B3'],
      ['MUI', 'mui', '007FFF'],
      ['Storybook', 'storybook', 'FF4785'],
      ['Sass', 'sass', 'CC6699'],
      ['Webpack', 'webpack', '8DD6F9'],
    ],
  },
  {
    speed: 54,
    dir: 'reverse' as const,
    items: [
      ['Node.js', 'nodedotjs', '5FA04E'],
      ['Express.js', 'express', '8E8EA0'],
      ['Fastify', 'fastify', '8E8EA0'],
      ['MongoDB', 'mongodb', '47A248'],
      ['PostgreSQL', 'postgresql', '4169E1'],
      ['GraphQL', 'graphql', 'E10098'],
      ['Socket.io', 'socketdotio', '8E8EA0'],
      ['Python', 'python', '3776AB'],
      ['Pandas', 'pandas', '8E8EA0'],
      ['Hugging Face', 'huggingface', 'FFD21E'],
      ['n8n', 'n8n', 'EA4B71'],
      ['Docker', 'docker', '2496ED'],
      ['Git', 'git', 'F05032'],
      ['Jest', 'jest', 'C63D14'],
      ['Vitest', 'vitest', '6E9F18'],
      ['Cypress', 'cypress', '69D3A7'],
    ],
  },
] as const;

export const jobs = [
  {
    date: 'بهمن ۱۴۰۴ — هم‌اکنون',
    role: 'توسعه‌دهندهٔ فرانت‌اند',
    org: 'گروه یکتا · مشهد، ایران · تمام‌وقت',
    current: true,
    link: null,
    bullets: [
      'ساخت پلتفرم **ERP داخلی** با React و shadcn/ui — بایگانی اسناد، چت سازمانی، حضور و غیاب و مدیریت وظایف؛ جایگزین کامل فرآیندهای دستی شرکت.',
      'پیاده‌سازی و یکپارچه‌سازی **پایپ‌لاین تحلیل احساسات** با Hugging Face که بازخورد خام مشتری را به بینش قابل استفاده برای تیم فروش تبدیل می‌کند.',
      'تحویل وب‌سایت معرفی هلدینگ گروه یکتا.',
      'کار در چرخهٔ Agile/Scrum با تیم‌های بک‌اند، طراحی و محصول؛ تحویل ریلیزها طبق زمان‌بندی.',
    ],
    tags: ['React', 'shadcn/ui', 'TypeScript', 'Hugging Face', 'Agile'],
  },
  {
    date: 'فروردین ۱۴۰۴ — دی ۱۴۰۴',
    role: 'توسعه‌دهندهٔ فرانت‌اند',
    org: 'هلیوم پارک · مشهد، ایران · تمام‌وقت',
    current: false,
    link: { href: 'https://heliumpark.ir', label: 'heliumpark.ir' },
    bullets: [
      '**تنها معمار و پیاده‌ساز** پلتفرم مشتری و پورتال کاربری از صفر — شامل جریان احراز هویت، ساخت پروفایل و داشبورد شخصی‌سازی‌شده.',
      'ساخت **سامانهٔ CRM کامل** با Next.js 15 و TypeScript؛ زمان پاسخ‌گویی پشتیبانی **۳۰٪ کاهش** یافت.',
      'طراحی **مدل تحلیلی RFM** برای کمپین‌های هدفمند؛ نگهداشت مشتری **۲۵٪ افزایش** یافت.',
      'کسب امتیاز **۹۰+ در Lighthouse** با SSR روی App Router و داده‌خوانی بهینه با React Query.',
      'مشارکت در توسعهٔ اندپوینت‌های بک‌اند با Express.js.',
    ],
    tags: ['Next.js 15', 'TypeScript', 'React Query', 'Express.js', 'SSR'],
  },
  {
    date: 'خرداد ۱۴۰۳ — اسفند ۱۴۰۳',
    role: 'توسعه‌دهندهٔ فرانت‌اند',
    org: 'نگاه ره‌گشا هوشمند · مشهد، ایران · تمام‌وقت',
    current: false,
    link: null,
    bullets: [
      'ساخت **سیستم اعلان بی‌درنگ** با WebSockets و Socket.io؛ تأخیر به‌روزرسانی **۴۰٪ کاهش** یافت.',
      'توسعهٔ سامانهٔ **جستجوی چندوجهی و اتوکامپلیت** که نرخ رهاشدن جستجو را به‌شکل محسوسی پایین آورد.',
      'بهینه‌سازی SSR/SSG در Next.js و بهبود Core Web Vitals و رتبهٔ SEO.',
      'تحلیل رفتاری کاربران با Python و Pandas؛ تعامل کاربر **۲۰٪ افزایش** یافت.',
    ],
    tags: ['Next.js', 'Socket.io', 'Python', 'Pandas', 'SEO'],
  },
  {
    date: 'آذر ۱۴۰۲ — خرداد ۱۴۰۳',
    role: 'توسعه‌دهندهٔ فرانت‌اند',
    org: 'نماآفرین · مشهد، ایران · تمام‌وقت',
    current: false,
    link: null,
    bullets: [
      'پیاده‌سازی قابلیت‌های اصلی **فروشگاه اینترنتی** با React.js — صفحه‌بندی محصولات، سبد خرید و فرآیند پرداخت امن.',
      'توسعهٔ رابط کاربری وبلاگ بر پایهٔ بهترین شیوه‌های SEO و بهبود دیده‌شدن ارگانیک.',
    ],
    tags: ['React.js', 'E-commerce', 'SEO'],
  },
  {
    date: 'خرداد ۱۴۰۲ — آبان ۱۴۰۲',
    role: 'توسعه‌دهندهٔ فرانت‌اند',
    org: 'دانشگاه خیام · مشهد، ایران · تمام‌وقت',
    current: false,
    link: null,
    bullets: [
      'طراحی و ساخت یک **وب‌اپلیکیشن فول‌استک** (Next.js، Express.js، MongoDB) برای مدیریت رویدادهای دانشگاه و ثبت‌نام دانشجویان — از ایده تا استقرار.',
      'ساخت **سامانهٔ رزرو آنلاین کافه‌تریا** و پورتال دانشجویی با React.js و Redux.',
      'تحویل پنل مدیریت کامل برای اعضای انجمن، همراه با رابط کاربری دقیق و ریسپانسیو با MUI و پشتیبانی کامل از مرورگرها.',
    ],
    tags: ['Next.js', 'Express.js', 'MongoDB', 'Redux', 'MUI'],
  },
] as const;

export const impact = [
  {
    to: 30,
    unit: '٪',
    title: 'کاهش زمان پاسخ‌گویی پشتیبانی',
    desc: 'با طراحی و ساخت سامانهٔ CRM اختصاصی روی Next.js 15 و TypeScript.',
    source: 'هلیوم پارک',
  },
  {
    to: 25,
    unit: '٪',
    title: 'افزایش نگهداشت مشتری',
    desc: 'با پیاده‌سازی مدل تحلیلی RFM برای هدف‌گذاری دقیق کمپین‌ها.',
    source: 'هلیوم پارک',
  },
  {
    to: 40,
    unit: '٪',
    title: 'کاهش تأخیر به‌روزرسانی',
    desc: 'با جایگزینی فراخوانی دوره‌ای با اعلان بی‌درنگ روی WebSocket و Socket.io.',
    source: 'نگاه ره‌گشا',
  },
  {
    to: 20,
    unit: '٪',
    title: 'افزایش تعامل کاربران',
    desc: 'با تحلیل رفتاری داده‌ها به کمک Python و Pandas و اصلاح مسیر کاربر.',
    source: 'نگاه ره‌گشا',
  },
  {
    to: 90,
    unit: '+',
    title: 'امتیاز عملکرد Lighthouse',
    desc: 'با رندر سمت سرور روی App Router و داده‌خوانی بهینه با React Query.',
    source: 'هلیوم پارک',
  },
  {
    to: 4,
    unit: '',
    title: 'پلتفرم تولیدی منتشرشده',
    desc: 'سامانه‌های CRM، ERP، SaaS و فروشگاه اینترنتی؛ همگی در حال استفادهٔ واقعی.',
    source: '۴ شرکت',
  },
] as const;

export const education = [
  {
    date: 'شهریور ۱۴۰۴ — هم‌اکنون',
    title: 'کارشناسی ارشد هوش مصنوعی',
    org: 'دانشگاه خیام · مشهد، ایران',
    badge: 'پذیرش از سهمیهٔ استعداد درخشان',
    fallback: '🎓',
  },
  {
    date: '۱۴۰۰ — ۱۴۰۴',
    title: 'کارشناسی مهندسی کامپیوتر',
    org: 'دانشگاه خیام · مشهد، ایران',
    badge: 'معدل ۱۷٫۷۳ از ۲۰',
    fallback: '📐',
  },
] as const;

export const contactTopics = [
  'سیستم عملیاتی کسب‌وکار',
  'اتوماسیون فرآیندها',
  'وب‌اپلیکیشن',
  'یکپارچه‌سازی API',
  'قابلیت هوش مصنوعی',
  'سایر',
] as const;

export const projectCategories = [
  { value: 'web', label: 'وب‌سایت' },
  { value: 'app', label: 'وب‌اپلیکیشن' },
  { value: 'crm', label: 'CRM و ERP' },
  { value: 'automation', label: 'اتوماسیون' },
  { value: 'ai', label: 'هوش مصنوعی' },
] as const;

export function categoryLabel(value: string): string {
  return projectCategories.find((c) => c.value === value)?.label ?? value;
}
