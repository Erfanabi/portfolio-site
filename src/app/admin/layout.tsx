import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  title: { default: 'پنل مدیریت', template: '%s | پنل مدیریت' },
  robots: { index: false, follow: false },
};

/* پنل باید همیشه دادهٔ تازه نشان بدهد */
export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
