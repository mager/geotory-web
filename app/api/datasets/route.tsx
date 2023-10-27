import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.next();
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  const body = await request.json();

  if (!user) {
    return NextResponse.next();
  }

  const response = await prisma.dataset.create({
    data: {
      name: body.name,
      description: body.description,
      source: body.source,
      userId: user.id,
      slug: body.slug,
    },
  });

  return NextResponse.json({ dataset: response });
}
