import { notFound, redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { PostEditor } from '@/components/admin/PostEditor';

export const metadata = { title: 'ویرایش مقاله' };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <PostEditor
      initial={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage ?? '',
        tags: post.tags,
        published: post.published,
        featured: post.featured,
      }}
    />
  );
}
