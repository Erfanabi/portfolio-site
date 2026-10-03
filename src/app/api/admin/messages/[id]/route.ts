import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { dbError, readJson, requireAuth } from '@/lib/api';

type Params = { params: Promise<{ id: string }> };

const patchSchema = z.object({
  read: z.boolean().optional(),
  archived: z.boolean().optional(),
});

export async function PATCH(req: Request, { params }: Params) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { id } = await params;
  const body = await readJson(req);
  const parsed = patchSchema.safeParse(body ?? {});
  if (!parsed.success) {
    return NextResponse.json({ error: 'درخواست نامعتبر است.' }, { status: 400 });
  }

  try {
    const message = await prisma.message.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ message });
  } catch (err) {
    return dbError(err);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const denied = await requireAuth();
  if (denied) return denied;

  const { id } = await params;

  try {
    await prisma.message.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return dbError(err);
  }
}
