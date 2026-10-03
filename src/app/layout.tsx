import type { Metadata, Viewport } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import { ThemeScript } from '@/components/ThemeScript';
import { BackgroundOrbs } from '@/components/BackgroundOrbs';
import { RevealScript } from '@/components/RevealScript';

const vazir = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-vazir',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.shortRole}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.shortRole}`,
    description: site.description,
    images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.shortRole}`,
    description: site.description,
    images: ['/assets/og-image.jpg'],
  },
  icons: { icon: '/assets/favicon.svg' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#efeef5' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0c12' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <RevealScript />
      </head>
      <body className={`${vazir.variable} font-sans antialiased`}>
        {/* پرش سریع به محتوا برای کاربران کیبورد و صفحه‌خوان */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[200] focus:rounded-xl focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          رفتن به محتوای اصلی
        </a>

        <BackgroundOrbs />
        {children}
      </body>
    </html>
  );
}
