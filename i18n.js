/* ==========================================================================
   دوزبانه‌سازی سایت (فارسی / انگلیسی)
   --------------------------------------------------------------------------
   هر عنصر قابل ترجمه در HTML یک data-i18n="کلید" دارد.
   برای ترجمهٔ یک صفت (placeholder، alt، aria-label) از این شکل استفاده می‌شود:
        data-i18n-attr="placeholder:ct.fName"
   چند صفت با ویرگول از هم جدا می‌شوند.

   برای افزودن یا ویرایش متن، فقط همین فایل را تغییر بده.
   ========================================================================== */

const I18N = {
  fa: {
    'html.title': 'عرفان شرفی — مهندس فرانت‌اند و سیستم‌های کسب‌وکار',
    'html.desc': 'عرفان شرفی — مهندس فرانت‌اند و سازندهٔ سیستم‌های عملیاتی کسب‌وکار. وب‌اپلیکیشن با React و Next.js، و اتوماسیون فرآیندها با n8n.',
    'html.ogDesc': 'برای کسب‌وکارها وب‌سایت عملیاتی می‌سازم؛ سیستمی که کارهای تکراری را خودکار می‌کند.',
    'html.locale': 'fa_IR',

    'lang.next': 'EN',
    'a11y.lang': 'تغییر زبان به انگلیسی',
    'a11y.theme': 'تغییر حالت روشن و تاریک',
    'a11y.menu': 'منو',

    'brand.mark': 'ع',
    'brand.name': 'عرفان شرفی',
    'brand.role': 'مهندس فرانت‌اند',

    'nav.home': 'خانه',
    'nav.about': 'درباره من',
    'nav.services': 'خدمات',
    'nav.tech': 'مهارت‌ها',
    'nav.work': 'سوابق',
    'nav.impact': 'دستاوردها',
    'nav.automation': 'اتوماسیون',

    'au.eyebrow': 'راه‌حل برای کسب‌وکارها',
    'au.title': 'کارهای تکراری‌تان را سیستمی می‌کنم',
    'au.lead': 'بیشتر کسب‌وکارها سفارش را در واتساپ می‌گیرند، فاکتور را دستی می‌نویسند و نوبت‌ها را روی کاغذ نگه می‌دارند. من این کارها را به یک سیستم منتقل می‌کنم تا خودشان انجام شوند.',

    'au.beforeTag': 'الان',
    'au.beforeTitle': 'کار چطور پیش می‌رود',
    'au.b1': 'سفارش‌ها لای چت تلگرام و واتساپ گم می‌شوند',
    'au.b2': 'فاکتور دستی نوشته می‌شود و اشتباه پیش می‌آید',
    'au.b3': 'نوبت‌ها روی دفتر کاغذی ثبت می‌شوند',
    'au.b4': 'پیگیری مشتری به حافظه و یادداشت وابسته است',
    'au.b5': 'گزارش فروش یا وجود ندارد یا دستی ساخته می‌شود',

    'au.afterTag': 'بعد',
    'au.afterTitle': 'کار چطور پیش می‌رود',
    'au.a1': 'سفارش‌ها در یک پنل ثبت و پیگیری می‌شوند',
    'au.a2': 'فاکتور خودکار صادر و برای مشتری ارسال می‌شود',
    'au.a3': 'نوبت‌دهی آنلاین با یادآوری خودکار انجام می‌شود',
    'au.a4': 'پیگیری مشتری روی زمان‌بندی خودکار می‌افتد',
    'au.a5': 'گزارش فروش و عملکرد لحظه‌ای در داشبورد است',

    'au.whatTitle': 'چه چیزهایی را خودکار می‌کنم',
    'au.c1t': 'ثبت سفارش',
    'au.c1d': 'فرم سفارش آنلاین، ثبت خودکار در سیستم و اطلاع‌رسانی فوری به تیم.',
    'au.c2t': 'نوبت‌دهی',
    'au.c2d': 'رزرو آنلاین، مدیریت تقویم و یادآوری خودکار پیش از نوبت.',
    'au.c3t': 'صدور فاکتور',
    'au.c3d': 'تولید خودکار فاکتور، ارسال برای مشتری و بایگانی منظم سوابق.',
    'au.c4t': 'پیگیری مشتری',
    'au.c4d': 'تاریخچهٔ هر مشتری، یادآوری تماس و پیام خودکار در زمان درست.',
    'au.c5t': 'گزارش‌گیری',
    'au.c5d': 'داشبورد فروش و عملکرد، به‌علاوهٔ گزارش دوره‌ای که خودش ساخته می‌شود.',
    'au.c6t': 'اتصال سرویس‌ها',
    'au.c6d': 'وصل‌کردن ابزارهایی که همین حالا دارید به هم، با n8n و وب‌هوک.',

    'au.howTitle': 'چطور کار می‌کنم',
    'au.s1t': 'مشاوره و شناخت',
    'au.s1d': 'می‌بینم کار در کسب‌وکار شما واقعاً چطور انجام می‌شود، نه اینکه چطور باید بشود.',
    'au.s2t': 'شناسایی نیاز',
    'au.s2d': 'مشخص می‌کنم کدام کارها ارزش خودکارشدن دارند و کدام‌ها بهتر است دستی بمانند.',
    'au.s3t': 'پیاده‌سازی و تحویل',
    'au.s3d': 'سیستم را می‌سازم، راه می‌اندازم و به تیم شما آموزش می‌دهم.',

    'au.cta': 'بیایید دربارهٔ کسب‌وکارتان حرف بزنیم',
    'au.ctaNote': 'مشاورهٔ اولیه رایگان است.',
    'au.n1': '۱',
    'au.n2': '۲',
    'au.n3': '۳',

    'nav.contact': 'تماس',
    'cta.talk': 'بیایید صحبت کنیم',

    'n.4plus': '۴+',
    'n.4': '۴',
    'n.90plus': '۹۰+',

    'hero.eyebrow': 'سلام، من',
    'hero.name': 'عرفان شرفی',
    'hero.role': 'مهندس فرانت‌اند و سیستم‌های کسب‌وکار',
    'hero.initials': 'ع‌ش',
    'hero.desc': 'برای کسب‌وکارها وب‌سایت عملیاتی می‌سازم؛ سیستمی که کارهای تکراری را خودکار می‌کند. با React، Next.js و TypeScript، آمادهٔ استفادهٔ واقعی.',
    'hero.cta1': 'مشاهدهٔ نمونه‌کارها',
    'hero.cta2': 'دانلود رزومه',
    'hero.trusted': 'همکاری داشته‌ام با',
    'hero.years': 'سال<br />تجربه',
    'hero.perf': 'امتیاز عملکرد',

    'co.yekta': 'گروه یکتا',
    'co.helium': 'هلیوم پارک',
    'co.negah': 'نگاه ره‌گشا',
    'co.nama': 'نماآفرین',
    'co.khayyam': 'دانشگاه خیام',

    'about.eyebrow': 'دربارهٔ من',
    'about.title': 'مهندسی با دقت<br />ساختن با هدف',
    'about.s1': 'سال تجربه',
    'about.s2': 'پلتفرم منتشرشده',
    'about.s3': 'امتیاز لایت‌هاوس',
    'about.p1': 'مهندس فرانت‌اند با بیش از ۴ سال تجربه در ساخت و انتشار پلتفرم‌های آمادهٔ تولید — شامل CRM، ERP، SaaS و فروشگاه‌های اینترنتی. در چند پروژه به‌عنوان تنها معمارِ سیستم فرانت‌اند کار کرده‌ام، با تمرکز جدی روی کیفیت کد و طراحی قابل نگهداری.',
    'about.p2': 'تسلط بالا بر React، Next.js و TypeScript، همراه با تجربهٔ گستردهٔ یکپارچه‌سازی سمت سرور با Node.js، Express و REST — و پیاده‌سازی قابلیت‌های مبتنی بر هوش مصنوعی در محیط عملیاتی.',
    'about.more': 'بیشتر بدانید',

    'svc.eyebrow': 'چه کاری انجام می‌دهم',
    'svc.title': 'خدمات من',
    'svc.1t': 'سیستم‌های عملیاتی کسب‌وکار',
    'svc.1d': 'وب‌سایتی که کار روزمرهٔ کسب‌وکار را انجام می‌دهد، نه فقط معرفی‌اش کند.',
    'svc.2t': 'اتوماسیون فرآیندها',
    'svc.2d': 'خودکارسازی کارهای تکراری با n8n، وب‌هوک و اتصال سرویس‌ها به هم.',
    'svc.3t': 'توسعهٔ وب‌اپلیکیشن',
    'svc.3d': 'ساخت اپلیکیشن‌های مقیاس‌پذیر با React و Next.js برای وب و موبایل.',
    'svc.4t': 'معماری فرانت‌اند',
    'svc.4d': 'طراحی سیستم‌های فرانت‌اند سرتاسری که با رشد پروژه قابل نگهداری می‌مانند.',
    'svc.5t': 'یکپارچه‌سازی API',
    'svc.5d': 'اتصال REST، GraphQL و WebSocket با Node.js، Express و Fastify.',
    'svc.6t': 'قابلیت‌های هوش مصنوعی',
    'svc.6d': 'تحلیل احساسات، اتصال به LLM API و پردازش داده‌های رفتاری در محیط عملیاتی.',

    'tech.eyebrow': 'ابزارها و مهارت‌ها',
    'tech.title': 'تکنولوژی‌هایی که بلدم',
    'tech.hint': 'برای توقف، نشانگر را روی نوار نگه دارید',

    'work.eyebrow': 'مسیر حرفه‌ای',
    'work.title': 'سوابق کاری و پروژه‌ها',
    'work.all': 'همهٔ پروژه‌ها',
    'job.role': 'توسعه‌دهندهٔ فرانت‌اند',
    'job.current': 'شاغل',

    'job1.date': 'بهمن ۱۴۰۴ — هم‌اکنون',
    'job1.org': 'گروه یکتا <i>·</i> مشهد، ایران <i>·</i> تمام‌وقت',
    'job1.b1': 'ساخت پلتفرم <b>ERP داخلی</b> با React و shadcn/ui — بایگانی اسناد، چت سازمانی، حضور و غیاب و مدیریت وظایف؛ جایگزین کامل فرآیندهای دستی شرکت.',
    'job1.b2': 'پیاده‌سازی و یکپارچه‌سازی <b>پایپ‌لاین تحلیل احساسات</b> با Hugging Face که بازخورد خام مشتری را به بینش قابل استفاده برای تیم فروش تبدیل می‌کند.',
    'job1.b3': 'تحویل وب‌سایت معرفی هلدینگ گروه یکتا.',
    'job1.b4': 'کار در چرخهٔ Agile/Scrum با تیم‌های بک‌اند، طراحی و محصول؛ تحویل ریلیزها طبق زمان‌بندی.',

    'job2.date': 'فروردین ۱۴۰۴ — دی ۱۴۰۴',
    'job2.org': 'هلیوم پارک <i>·</i> مشهد، ایران <i>·</i> تمام‌وقت',
    'job2.b1': '<b>تنها معمار و پیاده‌ساز</b> پلتفرم مشتری و پورتال کاربری از صفر — شامل جریان احراز هویت، ساخت پروفایل و داشبورد شخصی‌سازی‌شده.',
    'job2.b2': 'ساخت <b>سامانهٔ CRM کامل</b> با Next.js 15 و TypeScript؛ زمان پاسخ‌گویی پشتیبانی <b>۳۰٪ کاهش</b> یافت.',
    'job2.b3': 'طراحی <b>مدل تحلیلی RFM</b> برای کمپین‌های هدفمند؛ نگهداشت مشتری <b>۲۵٪ افزایش</b> یافت.',
    'job2.b4': 'کسب امتیاز <b>۹۰+ در Lighthouse</b> با SSR روی App Router و داده‌خوانی بهینه با React Query.',
    'job2.b5': 'مشارکت در توسعهٔ اندپوینت‌های بک‌اند با Express.js.',

    'job3.date': 'خرداد ۱۴۰۳ — اسفند ۱۴۰۳',
    'job3.org': 'نگاه ره‌گشا هوشمند <i>·</i> مشهد، ایران <i>·</i> تمام‌وقت',
    'job3.b1': 'ساخت <b>سیستم اعلان بی‌درنگ</b> با WebSockets و Socket.io؛ تأخیر به‌روزرسانی <b>۴۰٪ کاهش</b> یافت.',
    'job3.b2': 'توسعهٔ سامانهٔ <b>جستجوی چندوجهی و اتوکامپلیت</b> که نرخ رهاشدن جستجو را به‌شکل محسوسی پایین آورد.',
    'job3.b3': 'بهینه‌سازی SSR/SSG در Next.js و بهبود Core Web Vitals و رتبهٔ SEO.',
    'job3.b4': 'تحلیل رفتاری کاربران با Python و Pandas؛ تعامل کاربر <b>۲۰٪ افزایش</b> یافت.',

    'job4.date': 'آذر ۱۴۰۲ — خرداد ۱۴۰۳',
    'job4.org': 'نماآفرین <i>·</i> مشهد، ایران <i>·</i> تمام‌وقت',
    'job4.b1': 'پیاده‌سازی قابلیت‌های اصلی <b>فروشگاه اینترنتی</b> با React.js — صفحه‌بندی محصولات، سبد خرید و فرآیند پرداخت امن.',
    'job4.b2': 'توسعهٔ رابط کاربری وبلاگ بر پایهٔ بهترین شیوه‌های SEO و بهبود دیده‌شدن ارگانیک.',

    'job5.date': 'خرداد ۱۴۰۲ — آبان ۱۴۰۲',
    'job5.org': 'دانشگاه خیام <i>·</i> مشهد، ایران <i>·</i> تمام‌وقت',
    'job5.b1': 'طراحی و ساخت یک <b>وب‌اپلیکیشن فول‌استک</b> (Next.js، Express.js، MongoDB) برای مدیریت رویدادهای دانشگاه و ثبت‌نام دانشجویان — از ایده تا استقرار.',
    'job5.b2': 'ساخت <b>سامانهٔ رزرو آنلاین کافه‌تریا</b> و پورتال دانشجویی با React.js و Redux.',
    'job5.b3': 'تحویل پنل مدیریت کامل برای اعضای انجمن، همراه با رابط کاربری دقیق و ریسپانسیو با MUI و پشتیبانی کامل از مرورگرها.',

    'im.eyebrow': 'نتایج قابل اندازه‌گیری',
    'im.title': 'دستاوردها در محیط واقعی',
    'im.pct': '٪',
    'im.1t': 'کاهش زمان پاسخ‌گویی پشتیبانی',
    'im.1d': 'با طراحی و ساخت سامانهٔ CRM اختصاصی روی Next.js 15 و TypeScript.',
    'im.2t': 'افزایش نگهداشت مشتری',
    'im.2d': 'با پیاده‌سازی مدل تحلیلی RFM برای هدف‌گذاری دقیق کمپین‌ها.',
    'im.3t': 'کاهش تأخیر به‌روزرسانی',
    'im.3d': 'با جایگزینی فراخوانی دوره‌ای با اعلان بی‌درنگ روی WebSocket و Socket.io.',
    'im.4t': 'افزایش تعامل کاربران',
    'im.4d': 'با تحلیل رفتاری داده‌ها به کمک Python و Pandas و اصلاح مسیر کاربر.',
    'im.5t': 'امتیاز عملکرد Lighthouse',
    'im.5d': 'با رندر سمت سرور روی App Router و داده‌خوانی بهینه با React Query.',
    'im.6t': 'پلتفرم تولیدی منتشرشده',
    'im.6d': 'سامانه‌های CRM، ERP، SaaS و فروشگاه اینترنتی؛ همگی در حال استفادهٔ واقعی.',
    'im.6s': '۴ شرکت',

    'edu.eyebrow': 'پیشینهٔ دانشگاهی',
    'edu.title': 'تحصیلات',
    'edu.org': 'دانشگاه خیام <i>·</i> مشهد، ایران',
    'edu.logoAlt': 'نشان دانشگاه خیام',
    'edu.1date': 'شهریور ۱۴۰۴ — هم‌اکنون',
    'edu.1t': 'کارشناسی ارشد هوش مصنوعی',
    'edu.1b': 'پذیرش از سهمیهٔ استعداد درخشان',
    'edu.2date': '۱۴۰۰ — ۱۴۰۴',
    'edu.2t': 'کارشناسی مهندسی کامپیوتر',
    'edu.2b': 'معدل ۱۷٫۷۳ از ۲۰',

    'ct.available': 'هم‌اکنون آمادهٔ پروژهٔ جدید هستم',
    'ct.title': 'پروژه‌ای در ذهن دارید؟<br /><span class="gradient-text">بیایید با هم چیز خوبی بسازیم.</span>',
    'ct.lead': 'ایده‌تان را برایم بفرستید؛ معمولاً <strong>کمتر از ۲۴ ساعت</strong> پاسخ می‌دهم. مشاورهٔ اولیه هم رایگان است.',
    'ct.email': 'ارسال ایمیل',
    'ct.call': 'تماس مستقیم',
    'ct.lEmail': 'ایمیل',
    'ct.lPhone': 'تلفن',
    'ct.lGithub': 'گیت‌هاب',
    'ct.lLinkedin': 'لینکدین',
    'ct.lLoc': 'موقعیت',
    'ct.loc': 'مشهد، ایران',
    'ct.formTitle': 'فرم تماس سریع',
    'ct.fName': 'نام شما',
    'ct.fEmail': 'ایمیل شما',
    'ct.fTopic': 'موضوع پروژه',
    'ct.o1': 'سیستم عملیاتی کسب‌وکار',
    'ct.o2': 'اتوماسیون فرآیندها',
    'ct.o3': 'وب‌اپلیکیشن',
    'ct.o4': 'یکپارچه‌سازی API',
    'ct.o5': 'قابلیت هوش مصنوعی',
    'ct.o6': 'سایر',
    'ct.fMsg': 'کمی از پروژه‌تان بگویید…',
    'ct.send': 'ارسال پیام',

    /* پیام‌های فرم */
    'msg.invalid': 'لطفاً همهٔ فیلدها را کامل و درست پر کنید.',
    'msg.tooSoon': 'همین الان یک پیام فرستادید؛ چند لحظه صبر کنید.',
    'msg.sending': 'در حال ارسال…',
    'msg.sent': '✅ پیام شما رسید. به‌زودی جواب می‌دهم.',
    'msg.failed': 'ارسال ممکن نشد؛ برنامهٔ ایمیل‌تان را باز می‌کنم…',
    'msg.tgTitle': '🔔 <b>پیام جدید از فرم سایت</b>',
    'msg.tgName': '👤 <b>نام:</b>',
    'msg.tgEmail': '✉️ <b>ایمیل:</b>',
    'msg.tgTopic': '📁 <b>موضوع:</b>',
    'msg.tgMsg': '💬 <b>پیام:</b>',
    'msg.mailSubject': 'درخواست پروژه',

    'ft.copy': '© ۱۴۰۵ — عرفان شرفی',
    'ft.built': 'ساخته‌شده با HTML و CSS',
  },

  en: {
    'html.title': 'Erfan Sharafi — Front-End & Business Systems Engineer',
    'html.desc': 'Erfan Sharafi — Front-End Engineer and builder of operational business systems. Web apps with React and Next.js, process automation with n8n.',
    'html.ogDesc': 'I build operational websites for businesses — systems that automate the repetitive work.',
    'html.locale': 'en_US',

    'lang.next': 'فا',
    'a11y.lang': 'Switch language to Persian',
    'a11y.theme': 'Toggle light and dark mode',
    'a11y.menu': 'Menu',

    'brand.mark': 'E',
    'brand.name': 'Erfan Sharafi',
    'brand.role': 'Front-End Engineer',

    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.tech': 'Skills',
    'nav.work': 'Experience',
    'nav.impact': 'Impact',
    'nav.automation': 'Automation',

    'au.eyebrow': 'FOR BUSINESSES',
    'au.title': 'I turn your repetitive work into a system',
    'au.lead': 'Most businesses take orders over WhatsApp, write invoices by hand and keep appointments on paper. I move that work into a system so it runs itself.',

    'au.beforeTag': 'NOW',
    'au.beforeTitle': 'how the work runs',
    'au.b1': 'Orders get lost in Telegram and WhatsApp chats',
    'au.b2': 'Invoices are written by hand, and mistakes slip through',
    'au.b3': 'Appointments are tracked in a paper notebook',
    'au.b4': 'Customer follow-up depends on memory and sticky notes',
    'au.b5': 'Sales reporting either does not exist or is built by hand',

    'au.afterTag': 'AFTER',
    'au.afterTitle': 'how the work runs',
    'au.a1': 'Orders are logged and tracked in one panel',
    'au.a2': 'Invoices are generated and sent to the customer automatically',
    'au.a3': 'Appointments are booked online with automatic reminders',
    'au.a4': 'Customer follow-up runs on an automated schedule',
    'au.a5': 'Live sales and performance figures sit in a dashboard',

    'au.whatTitle': 'What I automate',
    'au.c1t': 'Order Intake',
    'au.c1d': 'An online order form, automatic logging into the system and instant notice to your team.',
    'au.c2t': 'Appointments',
    'au.c2d': 'Online booking, calendar management and automatic reminders before each slot.',
    'au.c3t': 'Invoicing',
    'au.c3d': 'Invoices generated automatically, sent to the customer and archived in order.',
    'au.c4t': 'Customer Follow-up',
    'au.c4d': 'A history for every customer, call reminders and automated messages at the right time.',
    'au.c5t': 'Reporting',
    'au.c5d': 'A sales and performance dashboard, plus periodic reports that build themselves.',
    'au.c6t': 'Connecting Your Tools',
    'au.c6d': 'Wiring the tools you already use into each other, with n8n and webhooks.',

    'au.howTitle': 'How I work',
    'au.s1t': 'Consult & Understand',
    'au.s1d': 'I look at how the work actually gets done in your business — not how it is supposed to.',
    'au.s2t': 'Identify the Needs',
    'au.s2d': 'I decide which tasks are worth automating and which are better left manual.',
    'au.s3t': 'Build & Hand Over',
    'au.s3d': 'I build the system, put it live and train your team on it.',

    'au.cta': "Let's talk about your business",
    'au.ctaNote': 'The first consultation is free.',
    'au.n1': '1',
    'au.n2': '2',
    'au.n3': '3',

    'nav.contact': 'Contact',
    'cta.talk': "Let's Talk",

    'n.4plus': '4+',
    'n.4': '4',
    'n.90plus': '90+',

    'hero.eyebrow': "HELLO, I'M",
    'hero.name': 'Erfan Sharafi',
    'hero.role': 'Front-End & Business Systems Engineer',
    'hero.initials': 'ES',
    'hero.desc': 'I build operational websites for businesses — systems that automate the repetitive work. Production-ready, with React, Next.js and TypeScript.',
    'hero.cta1': 'View My Work',
    'hero.cta2': 'Download CV',
    'hero.trusted': 'Worked with',
    'hero.years': 'Years of<br />Experience',
    'hero.perf': 'Performance',

    'co.yekta': 'Yekta Group',
    'co.helium': 'Helium Park',
    'co.negah': 'Negah Rahgosha',
    'co.nama': 'Namafareen',
    'co.khayyam': 'Khayyam University',

    'about.eyebrow': 'ABOUT ME',
    'about.title': 'Engineering with Precision<br />Building with Purpose',
    'about.s1': 'Years Experience',
    'about.s2': 'Platforms Shipped',
    'about.s3': 'Lighthouse Score',
    'about.p1': "I'm a front-end engineer with 4+ years of experience building and shipping production-grade platforms — CRM, ERP, SaaS and e-commerce. On several projects I was the sole architect of the front-end system, with a strong focus on code quality and maintainable design.",
    'about.p2': 'Highly proficient in React, Next.js and TypeScript, with extensive back-end integration experience using Node.js, Express and REST — plus hands-on work shipping AI-powered features into production.',
    'about.more': 'More About Me',

    'svc.eyebrow': 'WHAT I DO',
    'svc.title': 'Services I Offer',
    'svc.1t': 'Operational Business Systems',
    'svc.1d': 'A website that runs the daily work of the business, instead of just describing it.',
    'svc.2t': 'Process Automation',
    'svc.2d': 'Automating repetitive work with n8n, webhooks and service-to-service integration.',
    'svc.3t': 'Web App Development',
    'svc.3d': 'Building scalable React and Next.js applications for web and mobile.',
    'svc.4t': 'Front-End Architecture',
    'svc.4d': 'Designing end-to-end front-end systems that stay maintainable as they grow.',
    'svc.5t': 'API Integration',
    'svc.5d': 'Wiring up REST, GraphQL and WebSockets with Node.js, Express and Fastify.',
    'svc.6t': 'AI-Integrated Features',
    'svc.6d': 'Sentiment analysis, LLM API integration and behavioral data pipelines in production.',

    'tech.eyebrow': 'TOOLS & SKILLS',
    'tech.title': 'Technologies I Use',
    'tech.hint': 'Hover over a row to pause it',

    'work.eyebrow': 'CAREER PATH',
    'work.title': 'Experience & Projects',
    'work.all': 'All Projects',
    'job.role': 'Front-End Developer',
    'job.current': 'Current',

    'job1.date': 'Feb 2026 — Present',
    'job1.org': 'Yekta Group <i>·</i> Mashhad, Iran <i>·</i> Full-time',
    'job1.b1': 'Built an <b>internal ERP platform</b> in React and shadcn/ui — document archiving, an internal chat system, attendance tracking and a task manager; fully replacing the company\'s manual workflows.',
    'job1.b2': 'Built and integrated an <b>AI-powered sentiment-analysis pipeline</b> (Hugging Face) that turns raw customer feedback into actionable insights for the sales team.',
    'job1.b3': 'Delivered the Yekta Group holding-companies presentation website.',
    'job1.b4': 'Work in an Agile/Scrum workflow with back-end, design and product stakeholders, consistently delivering releases on schedule.',

    'job2.date': 'Apr 2025 — Jan 2026',
    'job2.org': 'Helium Park <i>·</i> Mashhad, Iran <i>·</i> Full-time',
    'job2.b1': '<b>Sole architect and implementor</b> of the customer-facing platform and user portal from scratch — including the authentication flow, profile creation and a personalized user dashboard.',
    'job2.b2': 'Built a <b>full CRM system</b> in Next.js 15 and TypeScript, reducing support response time by <b>30%</b>.',
    'job2.b3': 'Designed an <b>RFM analytics model</b> to enable targeted promotions, boosting customer retention by <b>25%</b>.',
    'job2.b4': 'Achieved <b>Lighthouse performance scores of 90+</b> through Next.js App Router SSR and optimized data-fetching with React Query.',
    'job2.b5': 'Contributed to back-end API endpoints using Express.js.',

    'job3.date': 'Jun 2024 — Mar 2025',
    'job3.org': 'Negah Rahgosha Hooshmand <i>·</i> Mashhad, Iran <i>·</i> Full-time',
    'job3.b1': 'Built a <b>real-time notification system</b> with WebSockets and Socket.io, cutting update latency by <b>40%</b>.',
    'job3.b2': 'Developed a <b>multi-faceted search and autocomplete</b> system that measurably reduced search abandonment.',
    'job3.b3': 'Optimized SSR/SSG in Next.js, improving Core Web Vitals and SEO rankings.',
    'job3.b4': 'Applied AI-driven behavioral analysis using Python and Pandas to boost user engagement by <b>20%</b>.',

    'job4.date': 'Dec 2023 — May 2024',
    'job4.org': 'Namafareen <i>·</i> Mashhad, Iran <i>·</i> Full-time',
    'job4.b1': 'Built core <b>e-commerce features</b> in React.js, including product pagination, cart and secure checkout.',
    'job4.b2': 'Developed the blog UI following SEO best practices, improving organic visibility.',

    'job5.date': 'Jun 2023 — Nov 2023',
    'job5.org': 'Khayyam University <i>·</i> Mashhad, Iran <i>·</i> Full-time',
    'job5.b1': 'Designed and built a <b>full-stack web application</b> (Next.js, Express.js, MongoDB) for managing university events and student registrations, from concept to deployment.',
    'job5.b2': 'Built an <b>online cafeteria reservation system</b> and student portal using React.js and Redux.',
    'job5.b3': 'Delivered a full-featured admin panel for association members alongside an optimized, pixel-accurate and responsive MUI interface with cross-browser support.',

    'im.eyebrow': 'MEASURABLE RESULTS',
    'im.title': 'Impact in Production',
    'im.pct': '%',
    'im.1t': 'Faster Support Response',
    'im.1d': 'By designing and building a dedicated CRM on Next.js 15 and TypeScript.',
    'im.2t': 'Higher Customer Retention',
    'im.2d': 'By implementing an RFM analytics model for precisely targeted campaigns.',
    'im.3t': 'Lower Update Latency',
    'im.3d': 'By replacing polling with real-time notifications over WebSockets and Socket.io.',
    'im.4t': 'More User Engagement',
    'im.4d': 'By analyzing behavioral data with Python and Pandas and refining the user journey.',
    'im.5t': 'Lighthouse Performance Score',
    'im.5d': 'Through App Router server-side rendering and optimized fetching with React Query.',
    'im.6t': 'Production Platforms Shipped',
    'im.6d': 'CRM, ERP, SaaS and e-commerce systems — all in real-world use.',
    'im.6s': '4 companies',

    'edu.eyebrow': 'ACADEMIC BACKGROUND',
    'edu.title': 'Education',
    'edu.org': 'Khayyam University <i>·</i> Mashhad, Iran',
    'edu.logoAlt': 'Khayyam University emblem',
    'edu.1date': 'Sep 2025 — Present',
    'edu.1t': 'M.Sc. in Artificial Intelligence',
    'edu.1b': 'Admitted via Exceptional Talent Quota',
    'edu.2date': '2021 — 2025',
    'edu.2t': 'B.Sc. in Computer Engineering',
    'edu.2b': 'GPA 17.73 / 20',

    'ct.available': 'Available for new projects',
    'ct.title': 'Have a project in mind?<br /><span class="gradient-text">Let\'s build something great together.</span>',
    'ct.lead': 'Send me your idea — I usually reply in <strong>under 24 hours</strong>, and the first consultation is free.',
    'ct.email': 'Send Email',
    'ct.call': 'Call Directly',
    'ct.lEmail': 'Email',
    'ct.lPhone': 'Phone',
    'ct.lGithub': 'GitHub',
    'ct.lLinkedin': 'LinkedIn',
    'ct.lLoc': 'Location',
    'ct.loc': 'Mashhad, Iran',
    'ct.formTitle': 'Quick Contact Form',
    'ct.fName': 'Your Name',
    'ct.fEmail': 'Your Email',
    'ct.fTopic': 'Your Project',
    'ct.o1': 'Operational Business System',
    'ct.o2': 'Process Automation',
    'ct.o3': 'Web Application',
    'ct.o4': 'API Integration',
    'ct.o5': 'AI-Integrated Feature',
    'ct.o6': 'Other',
    'ct.fMsg': 'Tell me a bit about your project…',
    'ct.send': 'Send Message',

    'msg.invalid': 'Please fill in all fields correctly.',
    'msg.tooSoon': 'You just sent a message — please wait a moment.',
    'msg.sending': 'Sending…',
    'msg.sent': '✅ Message received. I\'ll get back to you soon.',
    'msg.failed': 'Could not send — opening your email app…',
    'msg.tgTitle': '🔔 <b>New message from the website form</b>',
    'msg.tgName': '👤 <b>Name:</b>',
    'msg.tgEmail': '✉️ <b>Email:</b>',
    'msg.tgTopic': '📁 <b>Topic:</b>',
    'msg.tgMsg': '💬 <b>Message:</b>',
    'msg.mailSubject': 'Project inquiry',

    'ft.copy': '© 2026 Erfan Sharafi',
    'ft.built': 'Built with HTML & CSS',
  },
};

/* زبان جاری — پیش از رندر در <html> تنظیم شده است */
let LANG = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fa';

/* گرفتن یک رشته با کلید */
const t = key => (I18N[LANG] && I18N[LANG][key]) || (I18N.fa[key] ?? key);

/* تبدیل ارقام به شکل درستِ زبان جاری */
const num = n =>
  LANG === 'fa'
    ? String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    : String(n);

/* اعمال ترجمه‌ها روی کل صفحه */
function applyI18n() {
  const d = document.documentElement;
  d.setAttribute('lang', LANG);
  d.setAttribute('dir', LANG === 'fa' ? 'rtl' : 'ltr');

  document.title = t('html.title');

  const setMeta = (sel, val) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute('content', val);
  };
  setMeta('meta[name="description"]', t('html.desc'));
  setMeta('meta[property="og:title"]', t('html.title'));
  setMeta('meta[name="twitter:title"]', t('html.title'));
  setMeta('meta[property="og:description"]', t('html.ogDesc'));
  setMeta('meta[name="twitter:description"]', t('html.ogDesc'));
  setMeta('meta[property="og:locale"]', t('html.locale'));
  setMeta('meta[property="og:image:alt"]', t('html.title'));

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.innerHTML = t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(',').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });

  /* شمارنده‌هایی که قبلاً اجرا شده‌اند، با ارقام زبان جدید بازنویسی شوند */
  document.querySelectorAll('.count').forEach(el => {
    if (el.dataset.done === '1') el.textContent = num(el.dataset.to);
  });

  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: LANG } }));
}

function setLang(next) {
  LANG = next === 'en' ? 'en' : 'fa';
  try { localStorage.setItem('lang', LANG); } catch (e) {}
  applyI18n();
}

applyI18n();
