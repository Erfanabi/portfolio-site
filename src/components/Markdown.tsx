import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cx } from '@/lib/utils';

/* ==========================================================================
   نمایش متن مارک‌داون
   --------------------------------------------------------------------------
   react-markdown به‌طور پیش‌فرض HTML خام را اجرا نمی‌کند، پس متنی که در
   پنل ادمین نوشته می‌شود نمی‌تواند اسکریپت تزریق کند.
   ========================================================================== */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cx('prose-fa', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          /* لینک‌های بیرونی در تب تازه باز می‌شوند */
          a: ({ href, children: inner, ...rest }) => {
            const external = Boolean(href && /^https?:\/\//.test(href));
            return (
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...rest}
              >
                {inner}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
