import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Badge, EmptyState } from '@/components/ui';
import { MessageActions } from '@/components/admin/MessageActions';
import { faDateTime, faNum } from '@/lib/utils';
import { cx } from '@/lib/utils';

export const metadata = { title: 'پیام‌ها' };

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  if (!(await isAuthenticated())) redirect('/admin/login');

  const { view } = await searchParams;
  const archived = view === 'archived';

  const [messages, counts] = await Promise.all([
    prisma.message.findMany({ where: { archived }, orderBy: { createdAt: 'desc' } }),
    Promise.all([
      prisma.message.count({ where: { archived: false } }),
      prisma.message.count({ where: { archived: true } }),
    ]),
  ]);

  const [inboxCount, archivedCount] = counts;

  const tabs = [
    { href: '/admin/messages', label: 'صندوق', count: inboxCount, active: !archived },
    {
      href: '/admin/messages?view=archived',
      label: 'بایگانی',
      count: archivedCount,
      active: archived,
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-extrabold text-ink">پیام‌ها</h1>
        <p className="mt-1 text-[0.8rem] text-muted">پیام‌هایی که از فرم تماس سایت رسیده‌اند.</p>
      </div>

      <nav aria-label="نمای پیام‌ها">
        <ul className="flex gap-2">
          {tabs.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={t.active ? 'page' : undefined}
                className={cx(
                  'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.78rem] font-semibold transition-colors',
                  t.active ? 'bg-brand text-white' : 'glass-soft text-ink-2 hover:text-brand'
                )}
              >
                {t.label}
                <span className="num opacity-60">{faNum(t.count)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {messages.length === 0 ? (
        <EmptyState
          icon="✉"
          title={archived ? 'بایگانی خالی است' : 'پیامی در صندوق نیست'}
          description={
            archived
              ? 'پیام‌هایی که بایگانی کنید اینجا می‌آیند.'
              : 'وقتی کسی فرم تماس سایت را پر کند، پیامش همین‌جا نشان داده می‌شود.'
          }
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {messages.map((m) => (
            <li
              key={m.id}
              className={cx(
                'glass rounded-[var(--radius-md)] p-4',
                !m.read && !archived && 'border-s-[3px] border-s-brand'
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[0.92rem] font-bold text-ink">{m.name}</h2>
                    {!m.read && <Badge tone="brand">خوانده‌نشده</Badge>}
                    <Badge>{m.topic}</Badge>
                  </div>

                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] text-muted">
                    <a
                      href={`mailto:${m.email}`}
                      dir="ltr"
                      className="font-semibold text-brand hover:underline"
                    >
                      {m.email}
                    </a>
                    <span className="num">{faDateTime(m.createdAt)}</span>
                  </p>
                </div>

                <MessageActions
                  id={m.id}
                  read={m.read}
                  archived={m.archived}
                  name={m.name}
                  replyTo={m.email}
                  topic={m.topic}
                />
              </div>

              <p className="mt-3 whitespace-pre-wrap border-t border-line-2 pt-3 text-[0.86rem] leading-7 text-ink-2">
                {m.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
