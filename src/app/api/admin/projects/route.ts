import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { dbError, readJson, requireAuth } from '@/lib/api';
import { firstError, projectSchema } from '@/lib/validation';

export async function GET() {
  const denied = await requireAuth();
  if (denied) return denied;

  const projects = await prisma.project.findMany({
    orderBy: [{ order: 'asc' }, { updatedAt: 'desc' }],
  });

  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = await readJson(req);
  if (!body) return NextResponse.json({ error: 'درخواست نامعتبر است.' }, { status: 400 });

  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: firstError(parsed.error) }, { status: 400 });
  }

  const d = parsed.data;

  try {
    const project = await prisma.project.create({
      data: {
        title: d.title,
        slug: d.slug,
        summary: d.summary,
        content: d.content,
        coverImage: d.coverImage || null,
        client: d.client || null,
        role: d.role || null,
        year: d.year || null,
        liveUrl: d.liveUrl || null,
        repoUrl: d.repoUrl || null,
        category: d.category,
        stack: d.stack ?? '',
        published: d.published ?? false,
        featured: d.featured ?? false,
        order: d.order ?? 0,
      },
    });

    revalidatePath('/projects');
    revalidatePath('/');

    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    return dbError(err);
  }
}
