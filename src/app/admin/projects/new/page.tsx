import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { ProjectEditor } from '@/components/admin/ProjectEditor';

export const metadata = { title: 'نمونه‌کار تازه' };

export default async function NewProjectPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  return <ProjectEditor />;
}
