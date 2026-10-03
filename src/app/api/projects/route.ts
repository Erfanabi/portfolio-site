import { NextResponse } from 'next/server';
import { getPublishedProjects } from '@/lib/queries';
import { parseList } from '@/lib/utils';

/** فهرست عمومی نمونه‌کارها — ?category=crm */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get('category') ?? undefined;

  const projects = await getPublishedProjects({ category });

  return NextResponse.json({
    total: projects.length,
    projects: projects.map((p) => ({ ...p, stack: parseList(p.stack) })),
  });
}
