import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { dbError, readJson, requireAuth } from '@/lib/api';
import { firstError, postSchema } from '@/lib/validation';
import { readingMinutes, stripMarkdown } from '@/lib/utils';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: 'مقاله پیدا نشد.' }, { status: 404 });

  return NextResponse.json({ post });
}

export async function PATCH(req: Request, { params }: Params) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { id } = await params;
  const body = await readJson(req);
  if (!body) return NextResponse.json({ error: 'درخواست نامعتبر است.' }, { status: 400 });

  /* به‌روزرسانی جزئی هم مجاز است (مثلاً فقط کلید انتشار) */
  const parsed = postSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: firstError(parsed.error) }, { status: 400 });
  }

  const current = await prisma.post.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: 'مقاله پیدا نشد.' }, { status: 404 });

  const d = parsed.data;
  const willPublish = d.published ?? current.published;

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(d.title !== undefined && { title: d.title }),
        ...(d.slug !== undefined && { slug: d.slug }),
        ...(d.excerpt !== undefined && { excerpt: d.excerpt }),
        ...(d.content !== undefined && {
          content: d.content,
          readMinutes: readingMinutes(stripMarkdown(d.content)),
        }),
        ...(d.coverImage !== undefined && { coverImage: d.coverImage || null }),
        ...(d.tags !== undefined && { tags: d.tags ?? '' }),
        ...(d.featured !== undefined && { featured: d.featured }),
        ...(d.published !== undefined && { published: d.published }),
        /* زمان انتشار فقط بار اول ثبت می‌شود تا ترتیب مقاله‌ها جابه‌جا نشود */
        ...(willPublish && !current.publishedAt ? { publishedAt: new Date() } : {}),
      },
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    if (current.slug !== post.slug) revalidatePath(`/blog/${current.slug}`);
    revalidatePath('/');

    return NextResponse.json({ post });
  } catch (err) {
    return dbError(err);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { id } = await params;

  try {
    const post = await prisma.post.delete({ where: { id } });
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath('/');
    return NextResponse.json({ ok: true });
  } catch (err) {
    return dbError(err);
  }
}
