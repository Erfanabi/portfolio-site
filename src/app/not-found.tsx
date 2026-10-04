import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ButtonLink, Panel } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="px-4 pb-8 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-[700px]">
          <Panel className="text-center">
            <p aria-hidden className="num text-6xl font-extrabold text-brand/30">۴۰۴</p>
            <h1 className="mt-3 text-2xl font-extrabold text-ink">این صفحه پیدا نشد</h1>
            <p className="mx-auto mt-3 max-w-md text-[0.92rem] leading-8 text-muted">
              شاید نشانی اشتباه تایپ شده باشد یا مطلب جابه‌جا شده باشد. از این‌جا می‌توانید ادامه
              بدهید:
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/">صفحهٔ اصلی</ButtonLink>
              <ButtonLink href="/#projects" variant="light">نمونه‌کارها</ButtonLink>
              <ButtonLink href="/#contact" variant="light">تماس</ButtonLink>
            </div>
          </Panel>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
