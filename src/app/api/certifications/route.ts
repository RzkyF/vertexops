import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
  const items = await db.certification.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<{
    clientName: string;
    index: string;
    type: string;
    product: string;
    status: string;
    region?: string | null;
  }>;

  if (!body.clientName || !body.index || !body.type || !body.product || !body.status) {
    return NextResponse.json(
      { error: 'Missing required fields: clientName, index, type, product, status' },
      { status: 400 },
    );
  }

  const created = await db.certification.create({
    data: {
      clientName: body.clientName,
      index: body.index,
      type: body.type,
      product: body.product,
      status: body.status,
      region: body.region ?? null,
    },
  });

  return NextResponse.json(created, { status: 201 });
}

