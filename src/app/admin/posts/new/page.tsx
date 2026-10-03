import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { PostEditor } from '@/components/admin/PostEditor';

export const metadata = { title: 'مقالهٔ تازه' };

export default async function NewPostPage() {
  if (!(await isAuthenticated())) redirect('/admin/login');
  return <PostEditor />;
}
