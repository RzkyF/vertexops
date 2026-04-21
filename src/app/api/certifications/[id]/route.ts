import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const item = await db.certification.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  const body = (await req.json()) as Partial<{
    clientName: string;
    index: string;
    type: string;
    product: string;
    status: string;
    region?: string | null;
  }>;

  try {
    const updated = await db.certification.update({
      where: { id },
      data: {
        ...(body.clientName !== undefined ? { clientName: body.clientName } : {}),
        ...(body.index !== undefined ? { index: body.index } : {}),
        ...(body.type !== undefined ? { type: body.type } : {}),
        ...(body.product !== undefined ? { product: body.product } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.region !== undefined ? { region: body.region } : {}),
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  try {
    await db.certification.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

