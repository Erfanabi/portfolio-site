import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { dbError, readJson, requireAuth } from '@/lib/api';
import { firstError, postSchema } from '@/lib/validation';
import { readingMinutes, stripMarkdown } from '@/lib/utils';

export async function GET() {
  const denied = await requireAuth();
  if (denied) return denied;

  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      published: true,
      featured: true,
      views: true,
      tags: true,
      readMinutes: true,
      createdAt: true,
      updatedAt: true,
      publishedAt: true,
    },
  });

  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = await readJson(req);
  if (!body) return NextResponse.json({ error: 'درخواست نامعتبر است.' }, { status: 400 });

  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: firstError(parsed.error) }, { status: 400 });
  }

  const d = parsed.data;

  try {
    const post = await prisma.post.create({
      data: {
        title: d.title,
        slug: d.slug,
        excerpt: d.excerpt,
        content: d.content,
        coverImage: d.coverImage || null,
        tags: d.tags ?? '',
        published: d.published ?? false,
        featured: d.featured ?? false,
        readMinutes: readingMinutes(stripMarkdown(d.content)),
        publishedAt: d.published ? new Date() : null,
      },
    });

    revalidatePath('/blog');
    revalidatePath('/');

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    return dbError(err);
  }
}
