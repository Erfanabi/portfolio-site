import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* شمارش بازدید — صفحهٔ مقاله ایستا است، پس شمارش از مرورگر انجام می‌شود */
export async function POST(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    await prisma.post.updateMany({
      where: { slug: decodeURIComponent(slug), published: true },
      data: { views: { increment: 1 } },
    });
  } catch {
    /* شمارش بازدید نباید هیچ‌وقت به کاربر خطا بدهد */
  }

  return new NextResponse(null, { status: 204 });
}
