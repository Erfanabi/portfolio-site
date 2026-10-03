import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

/** چیدمان صفحه‌های عمومی — سربرگ و پانوشت یک‌بار رندر می‌شوند و
    هنگام جابه‌جایی بین صفحه‌ها یا نمایش حالت بارگذاری سر جایشان می‌مانند. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
