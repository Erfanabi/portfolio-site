import { notFound, redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProjectEditor } from '@/components/admin/ProjectEditor';

export const metadata = { title: 'ویرایش نمونه‌کار' };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin/login');

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <ProjectEditor
      initial={{
        id: project.id,
        title: project.title,
        slug: project.slug,
        summary: project.summary,
        content: project.content,
        coverImage: project.coverImage ?? '',
        client: project.client ?? '',
        role: project.role ?? '',
        year: project.year ?? '',
        liveUrl: project.liveUrl ?? '',
        repoUrl: project.repoUrl ?? '',
        category: project.category,
        stack: project.stack,
        published: project.published,
        featured: project.featured,
        order: project.order,
      }}
    />
  );
}
