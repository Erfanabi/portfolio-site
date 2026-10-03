import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/queries';
import { parseList } from '@/lib/utils';

/** فهرست عمومی مقاله‌ها — ?page=1&tag=react&q=متن */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get('page') ?? 1) || 1);
  const tag = url.searchParams.get('tag') ?? undefined;
  const q = url.searchParams.get('q') ?? undefined;

  const { items, total, pages } = await getPublishedPosts({ page, tag, q });

  return NextResponse.json({
    page,
    pages,
    total,
    posts: items.map((p) => ({ ...p, tags: parseList(p.tags) })),
  });
}
