import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { dbError, readJson, requireAuth } from '@/lib/api';
import { firstError, projectSchema } from '@/lib/validation';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return NextResponse.json({ error: 'پروژه پیدا نشد.' }, { status: 404 });

  return NextResponse.json({ project });
}

export async function PATCH(req: Request, { params }: Params) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { id } = await params;
  const body = await readJson(req);
  if (!body) return NextResponse.json({ error: 'درخواست نامعتبر است.' }, { status: 400 });

  const parsed = projectSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: firstError(parsed.error) }, { status: 400 });
  }

  const current = await prisma.project.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: 'پروژه پیدا نشد.' }, { status: 404 });

  const d = parsed.data;

  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(d.title !== undefined && { title: d.title }),
        ...(d.slug !== undefined && { slug: d.slug }),
        ...(d.summary !== undefined && { summary: d.summary }),
        ...(d.content !== undefined && { content: d.content }),
        ...(d.coverImage !== undefined && { coverImage: d.coverImage || null }),
        ...(d.client !== undefined && { client: d.client || null }),
        ...(d.role !== undefined && { role: d.role || null }),
        ...(d.year !== undefined && { year: d.year || null }),
        ...(d.liveUrl !== undefined && { liveUrl: d.liveUrl || null }),
        ...(d.repoUrl !== undefined && { repoUrl: d.repoUrl || null }),
        ...(d.category !== undefined && { category: d.category }),
        ...(d.stack !== undefined && { stack: d.stack ?? '' }),
        ...(d.published !== undefined && { published: d.published }),
        ...(d.featured !== undefined && { featured: d.featured }),
        ...(d.order !== undefined && { order: d.order }),
      },
    });

    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);
    if (current.slug !== project.slug) revalidatePath(`/projects/${current.slug}`);
    revalidatePath('/');

    return NextResponse.json({ project });
  } catch (err) {
    return dbError(err);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { id } = await params;

  try {
    const project = await prisma.project.delete({ where: { id } });
    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath('/');
    return NextResponse.json({ ok: true });
  } catch (err) {
    return dbError(err);
  }
}
